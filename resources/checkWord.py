import sys

all_words = []

def readInWords():
    with open(sys.argv[1]) as f:
        for line in f:
            all_words.append(line.strip())

def checkWord(word):
    if word in all_words:
        return True
    else:
        return False

readInWords()
print(checkWord(sys.argv[2]))