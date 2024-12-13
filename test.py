# Define the page reference sequence and frame size
page_references = [4, 3, 2, 1, 4, 3, 5, 4, 3, 2, 1, 5]
frame_size = 3

# Initialize memory and page fault counter
memory = []
page_faults = 0

# Simulate LRU page replacement algorithm
for page in page_references:
    if page not in memory:  # Page fault occurs
        page_faults += 1
        if len(memory) == frame_size:  # Replace least recently used page
            memory.pop(0)
        memory.append(page)  # Add the new page
    else:
        # Update LRU order by moving accessed page to the end
        memory.remove(page)
        memory.append(page)

print(page_faults)
page_faults
