from pprint import pprint

# REF: https://iq.opengenus.org/autocomplete-with-ternary-search-tree/
class Node:
    def __init__(self, value=None, end_of_Word=False):
        self.value = value
        self.left = None
        self.right = None
        self.equal = None
        self.end_of_Word: bool = end_of_Word


class AutoCompleteTree:
    def __init__(self, word_list):
        self.n = Node()
        for word in word_list:
            self.insert(word, self.n)

    def insert(self, word, node):
        char = word[0]
        if not node.value:
            node.value = char

        if char < node.value:
            if not node.left:
                node.left = Node()
            self.insert(word, node.left)
        elif char > node.value:
            if not node.right:
                node.right = Node()
            self.insert(word, node.right)
        else:
            if len(word) == 1:
                node.end_of_Word = True
                return

            if not node.equal:
                node.equal = Node()
            self.insert(word[1:], node.equal)

    # this become one generator, but only one
    def all_suffixes(self, pattern, node):
        # print("this node", node.value)
        # print("compared:", node.r)
        if node.end_of_Word:
            print("{0}{1}".format(pattern, node.value))  # a complete word
            # print("endtag")
            yield "{0}{1}".format(pattern, node.value)

        if node.left:
            for word in self.all_suffixes(pattern, node.left):
                # print("left")
                yield word
        if node.right:
            for word in self.all_suffixes(pattern, node.right):
                # print("right")
                yield word
        if node.equal:
            # print("in equal", node.equal.value, pattern)
            for word in self.all_suffixes(pattern + node.value, node.equal):
                # print("word", word)
                # print("pattern", pattern)
                # print("node.value", node.value)
                # print("node.equal.value", node.equal.value)
                # print("---")
                # print("equal")
                yield word

    def find(self, pattern):
        final_pattern = {pat: set([]) for pat in pattern}

        for pat in final_pattern.keys():
            word = self.find_(pat)
            if word == None:
                return None
            else:
                completions = {x for x in word}
                print("completions", completions)
            return list(completions)

    def find_(self, pattern):
        node = self.n
        # print("pars", node.value)
        for char in pattern:
            while True:
                if char > node.value:
                    node = node.right
                elif char < node.value:
                    node = node.left
                else:
                    node = node.equal
                    break
                if not node:
                    return None

        # print([i for i in self.all_suffixes(pattern, node)])
        # print("pars", node.right.equal.left.value)
        # print("a", a)
        # a = self.all_suffixes(pattern, node)
        # pprint(a.__next__())
        # pprint(a.__next__())
        # pprint(a.__next__())
        # pprint(a.__next__())
        return self.all_suffixes(pattern, node)


pattern = ["c", "h"]
word_list = [
    "aardvark",
    "altimeter",
    "apotactic",
    "bagonet",
    "boatlip",
    "carburant",
    "chyliferous",
    "consonance",
    "cyclospondylic",
    "dictyostele",
    "echelon",
    "estadal",
    "flaunty",
    "gesneriaceous",
    "hygienic",
    "infracentral",
    "jipijapa",
    "lipoceratous",
    "melanthaceae",
]

t = AutoCompleteTree(word_list)
# pprint(t.n.right.right.value)  # c
# pprint(t.n.right.right.equal.right.value)  # h
# pprint(t.n.right.right.equal.right.equal.value)  # y

# pprint(t.n.right.right.value)  # c
# pprint(t.n.right.right.equal.value)  # a
# pprint(t.n.right.right.equal.equal.value)  # r
# pprint(t.n.right.right.equal.equal.equal.value)  # b
# pprint(t.n.right.right.equal.equal.equal.equal.value)  # u
# # pprint(t.n.middle.right.right.value)
# pprint(t.n.right.right.value)
# pprint(t.n.equal.equal.value)
print(t.find(pattern))
