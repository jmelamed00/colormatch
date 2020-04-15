# colormatch
The code to write the colormatch game from Udemy
I am still working on this code to fix the bug that I found in Udemy's source code.
The bug is that if a user selects more than one color and then deselects starting with not the last color selected, there is a mismatch between the index of the array that contains the guesses (arr2 in Udemy; guesses in my code) and the data-value stored in the <div>.
