import os
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime

# Function to get the current visitor count from komarev API
def get_visitor_count_from_api():
    try:
        # Using a GitHub profile counter API to get the visitor count
        username = "AbinVarghese1"  # Change this to your GitHub username
        response = requests.get(f"https://komarev.com/ghpvc/?username={username}")
        
        # Parse the count from the response
        if response.status_code == 200:
            # The profile view count is embedded in the SVG, extract with BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')
            count_text = soup.find('text').text.strip()
            # Extract just the number
            count = int(re.search(r'\d+', count_text).group())
            print(f"Successfully fetched visitor count from API: {count}")
            return count
        else:
            print(f"Failed to get visitor count: HTTP {response.status_code}")
            return None
    except Exception as e:
        print(f"Error getting visitor count from API: {e}")
        return None

# Function to get the current count from the SVG file
def get_current_count_from_svg():
    try:
        svg_file_path = "visitor-counter.svg"
        if not os.path.exists(svg_file_path):
            return 0
            
        with open(svg_file_path, 'r') as file:
            svg_content = file.read()
        
        # Extract all digits from the SVG
        digit_texts = re.findall(r'<text [^>]*>(\d)</text>', svg_content)
        if not digit_texts:
            return 0
            
        # Combine digits to form the current count
        current_count = int(''.join(digit_texts).lstrip('0') or '0')
        print(f"Current count from SVG: {current_count}")
        return current_count
    except Exception as e:
        print(f"Error reading current count from SVG: {e}")
        return 0

# Function to get the last check timestamp
def get_last_check_timestamp():
    try:
        timestamp_file = "last_check.txt"
        if not os.path.exists(timestamp_file):
            return None
            
        with open(timestamp_file, 'r') as file:
            timestamp_str = file.read().strip()
            return datetime.fromisoformat(timestamp_str)
    except Exception as e:
        print(f"Error reading last check timestamp: {e}")
        return None

# Function to save the current timestamp
def save_current_timestamp():
    try:
        timestamp_file = "last_check.txt"
        current_time = datetime.now().isoformat()
        
        with open(timestamp_file, 'w') as file:
            file.write(current_time)
        
        print(f"Saved current timestamp: {current_time}")
        return True
    except Exception as e:
        print(f"Error saving timestamp: {e}")
        return False

# Function to update the SVG with the new count
def update_svg_counter(count):
    svg_file_path = "visitor-counter.svg"
    
    # Make sure the file exists
    if not os.path.exists(svg_file_path):
        print(f"Error: {svg_file_path} does not exist")
        return False
        
    try:
        # Read the SVG file
        with open(svg_file_path, 'r') as file:
            svg_content = file.read()
        
        # Convert count to a string with leading zeros
        count_str = str(count).zfill(4)
        
        # If count exceeds 9999, show the fifth digit
        if count > 9999:
            count_str = str(count).zfill(5)
            # Modify SVG to show 5th digit
            svg_content = svg_content.replace('<g id="fifthDigit" transform="translate(150, 30)" opacity="0">', 
                                             '<g id="fifthDigit" transform="translate(150, 30)" opacity="1">')
        
        # Update each digit in the SVG
        digit_positions = [(230, 0), (210, 1), (190, 2), (170, 3)]
        # Add fifth digit position if needed
        if len(count_str) > 4:
            digit_positions.append((150, 4))
        
        # Start with the rightmost digit
        for x_pos, idx in digit_positions:
            if idx < len(count_str):
                digit = count_str[-(idx+1)]  # Get digit from right to left
                
                # Find the text element at this position and update it
                pattern = r'<g transform="translate\(' + str(x_pos) + r', 30\)"[^>]*>.*?<text [^>]*>(\d)</text>'
                replacement = f'<g transform="translate({x_pos}, 30)">\n      <rect x="-10" y="-12" width="20" height="24" rx="2" fill="#000000" opacity="0.6" />\n      <text x="0" y="6" font-family="\'Courier New\', monospace" font-size="20" fill="#41B883" text-anchor="middle">{digit}</text>'
                
                svg_content = re.sub(pattern, replacement, svg_content, flags=re.DOTALL)
        
        # Add timestamp comment at the bottom of SVG
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        svg_content = re.sub(r'</svg>\s*$', f'  <!-- Last updated: {timestamp} -->\n</svg>', svg_content)
        
        # Write the updated SVG back to the file
        with open(svg_file_path, 'w') as file:
            file.write(svg_content)
            
        print(f"Successfully updated visitor count to {count}")
        return True
    except Exception as e:
        print(f"Error updating SVG: {e}")
        return False

# Store analytics data
def store_analytics_data(current_count, api_count):
    try:
        analytics_file = "counter_analytics.csv"
        timestamp = datetime.now().isoformat()
        
        # Create file with header if it doesn't exist
        if not os.path.exists(analytics_file):
            with open(analytics_file, 'w') as file:
                file.write("timestamp,current_svg_count,api_count,diff\n")
        
        # Append new analytics data
        with open(analytics_file, 'a') as file:
            diff = api_count - current_count if api_count is not None else 0
            file.write(f"{timestamp},{current_count},{api_count if api_count is not None else 'N/A'},{diff}\n")
        
        print(f"Stored analytics data")
        return True
    except Exception as e:
        print(f"Error storing analytics data: {e}")
        return False

# Main function
if __name__ == "__main__":
    # Get current count from SVG
    current_count = get_current_count_from_svg()
    print(f"Current SVG count: {current_count}")
    
    # Get count from API
    api_count = get_visitor_count_from_api()
    
    # Determine new count
    new_count = current_count + 1  # Default increment by 1
    
    if api_count is not None:
        # If API count is higher than our current count + 1, use that instead
        # This accounts for multiple visitors between checks
        if api_count > current_count + 1:
            new_count = api_count
            print(f"Using API count: {api_count} (multiple visitors detected)")
    
    # Update the SVG with the new count
    success = update_svg_counter(new_count)
    
    # Store analytics data for tracking
    store_analytics_data(current_count, api_count)
    
    # Save the current timestamp
    save_current_timestamp()
    
    if success:
        print(f"SVG counter updated from {current_count} to {new_count}")
    else:
        print("Failed to update SVG counter")
