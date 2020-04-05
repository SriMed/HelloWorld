import sys

pos_word = sys.argv[1]
letters = sys.argv[2]
d_letters = list(letters)

def anagram_check():
    if len(pos_word) > len(d_letters):
        return False
    for s in pos_word:
        if s in d_letters:
            d_letters.remove(s)
        else:
            return False
    return True

print(anagram_check())
