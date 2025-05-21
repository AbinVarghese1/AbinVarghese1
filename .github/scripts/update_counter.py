import os
import re
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET

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
            return count
        else:
            # If we can't get the count, return a default
            return 1
    except Exception as e:
        print(f"Error getting visitor count: {e}")
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
        
        # Convert count to a string with leading zeros if needed
        count_str = str(count).zfill(4)
        
        # If count exceeds 9999, show the fifth digit
        if count > 9999:
            count_str = str(count).zfill(5)
            # Modify SVG to show 5th digit (this is a simple approach for demonstration)
            svg_content = svg_content.replace('<g id="fifthDigit" transform="translate(150, 30)" opacity="0">', 
                                             '<g id="fifthDigit" transform="translate(150, 30)" opacity="1">')
        
        # Update the digit text elements
        for i, digit in enumerate(count_str[::-1]):
            # Start from the rightmost digit (4th position)
            position = 4 - i if i < 4 else 0  # Handle the case where we have a 5th digit
            
            # Find and replace the digit text in the SVG
            pattern = rf'<g transform="translate\(({230 - position*20}), 30\)">\s*<rect [^>]*>\s*<text [^>]*>(\d)</text>'
            replacement = f'<g transform="translate({230 - position*20}, 30)">\n      <rect x="-10" y="-12" width="20" height="24" rx="2" fill="#000000" opacity="0.6" />\n      <text x="0" y="6" font-family="\'Courier New\', monospace" font-size="20" fill="#41B883" text-anchor="middle">{digit}</text>'
            
            svg_content = re.sub(pattern, replacement, svg_content)
        
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
    update_svg_counter(visitor_count)
