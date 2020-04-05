import random

total_letters_length = 6

def genRandomLetters():
    consonants = "bcdfghjklmnpqrstvwxyz"
    vowels = "aeiou"

    #just pick between 1-3 vowels and the opposite number of consonants
    num_vowels = random.randint(1,3)
    num_consonants = total_letters_length - num_vowels

    vl = [x for x in range(0,len(vowels))]
    cl = [x for x in range(0, len(consonants))]

    letters = []
    for i in range(0, num_vowels):
        index = random.choice(vl)
        letters.append(vowels[index])
        # vl.remove(index)  #this line will generate unique vowels
    for i in range(0, num_consonants):
        index = random.choice(cl)
        letters.append(consonants[index])
        # cl.remove(index) #this will generate unique consonants

    ls = ''.join(letters)
    return ls

letters = genRandomLetters()
print(letters)


