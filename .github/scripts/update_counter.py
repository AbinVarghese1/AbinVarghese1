import os
import re
import requests
from bs4 import BeautifulSoup

# Function to get the current visitor count
def get_visitor_count():
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
            print(f"Successfully fetched visitor count: {count}")
            return count
        else:
            print(f"Failed to get visitor count: HTTP {response.status_code}")
            # Fallback to reading the current count from the SVG
            return get_current_count_from_svg()
    except Exception as e:
        print(f"Error getting visitor count: {e}")
        # Fallback to reading the current count from the SVG
        return get_current_count_from_svg()

# Function to get the current count from the SVG file
def get_current_count_from_svg():
    try:
        svg_file_path = "visitor-counter.svg"
        if not os.path.exists(svg_file_path):
            return 1
            
        with open(svg_file_path, 'r') as file:
            svg_content = file.read()
        
        # Extract all digits from the SVG
        digit_texts = re.findall(r'<text [^>]*>(\d)</text>', svg_content)
        if not digit_texts:
            return 1
            
        # Combine digits to form the current count
        current_count = int(''.join(digit_texts).lstrip('0') or '0')
        print(f"Current count from SVG: {current_count}")
        # Increment by 1 for a new visitor
        return current_count + 1
    except Exception as e:
        print(f"Error reading current count from SVG: {e}")
        return 1

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
        
        # Write the updated SVG back to the file
        with open(svg_file_path, 'w') as file:
            file.write(svg_content)
            
        print(f"Successfully updated visitor count to {count}")
        return True
    except Exception as e:
        print(f"Error updating SVG: {e}")
        return False

# Main function
if __name__ == "__main__":
    # Get the visitor count
    visitor_count = get_visitor_count()
    print(f"Current visitor count: {visitor_count}")
    
    # Update the SVG with the new count
    success = update_svg_counter(visitor_count)
    
    if success:
        print("SVG counter updated successfully")
    else:
        print("Failed to update SVG counter")
