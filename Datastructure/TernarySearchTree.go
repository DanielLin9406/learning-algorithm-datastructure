package tree

type Search struct {
}

// Node define a basic element for
type Node struct {
	value  string
	nilTag bool
	endTag bool
	left   *Node
	right  *Node
	eq     *Node
}

type AutoCompleteTreeProps struct {
	WordList []string
}

type AutoCompleteTree struct {
	node *Node
}

func (a *AutoCompleteTree) init(wordList []string) {
	for _, word := range wordList {
		a.Insert(word, a.node)
	}
}

// Insert define how to add node in tree
func (a *AutoCompleteTree) Insert(word string, node *Node) {
	char := string(word[0])
	// fmt.Printf("%#U starts at byte position %d\n", char)
	if a.node.nilTag {
		node.value = char
		node.nilTag = false
	}
	if char < node.value {
		if a.node.left.nilTag {
			node.left = &Node{
				nilTag: true,
				endTag: false,
			}
		}
		a.Insert(word, node.left)
	} else if char > node.value {
		if a.node.right.nilTag {
			node.right = &Node{
				nilTag: true,
				endTag: false,
			}
		}
		a.Insert(word, node.right)
	} else {
		if len(word) == 1 {
			node.endTag = true
			return
		}
		if node.eq.nilTag {
			node.eq = &Node{
				nilTag: true,
				endTag: false,
			}
		}
		a.Insert(word[1:], node.eq)
	}
}

func (a *AutoCompleteTree) AllSuffixes(pattern []string, node Node) {
	if node.endTag {
		c := make(chan int)
		go func() {

		}()
		close(c)
		return
	}
}

func (a *AutoCompleteTree) find() {}

func (a *AutoCompleteTree) find_() {}

// NewAutoCompleteTree define construction
func NewAutoCompleteTree(wordList []string) *AutoCompleteTree {
	t := &AutoCompleteTree{
		node: &Node{
			nilTag: true,
			endTag: false,
		},
	}
	t.init(wordList)
	return t
}
