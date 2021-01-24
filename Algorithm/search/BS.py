import math

def binary_search(sorted, value):
  lowerBoundP = 0
  upperBoundP = len(sorted) - 1
  middleP = 0
  while sorted[middleP] != value and lowerBoundP < upperBoundP:
    if (value < sorted[middleP]):
      upperBoundP = middleP - 1
    elif (value > sorted[middleP]):
      lowerBoundP = middleP + 1
    middleP = math.floor((upperBoundP + lowerBoundP) / 2);    
    print(type(middleP))
    
  if sorted[middleP] == value:
    return middleP
  else:
    return -1
  
print(binary_search([1,3,9,11,15,19,29], 15))