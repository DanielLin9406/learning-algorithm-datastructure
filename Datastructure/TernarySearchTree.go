package tree

import "fmt"

type Search struct {
}

// Node define a basic element for
type Node struct {
	value  string
	r      rune
	endTag bool
	left   *Node
	right  *Node
	middle *Node
}

type AutoCompleteTreeProps struct {
	WordList []string
}

type AutoCompleteTree struct {
	node *Node
}

func (a *AutoCompleteTree) init(wordList []string) {
	for _, word := range wordList {
		// fmt.Printf("value: %v \n", a.node.value)
		a.node = a.Insert(word, a.node)
	}
	// fmt.Printf("value: %v \n", a.node)
	// fmt.Printf("left value: %v \n", a.node.left.value)
	// fmt.Printf("right value: %v \n", a.node.right.value)
}

// Insert define how to add node in tree
func (a *AutoCompleteTree) Insert(word string, node *Node) *Node {
	char := string(word[0])
	r := rune(word[0])
	// fmt.Printf("-----\n")
	// fmt.Printf("Word is now: %s\n", word)
	// fmt.Printf("Char is now: %s\n", char)
	if node.value == "" {
		node.value = char
		node.r = r
		// fmt.Printf("node.value %s\n", node.value)
	}
	if r < node.r {
		if node.left == nil {
			node.left = &Node{
				value:  "",
				endTag: false,
			}
		}
		node.left = a.Insert(word, node.left)
		// fmt.Printf("node.left %s\n", node.left.value)
	} else if r > node.r {
		if node.right == nil {
			node.right = &Node{
				value:  "",
				endTag: false,
			}
		}
		node.right = a.Insert(word, node.right)
		// fmt.Printf("node.right %s\n", node.right.value)
	} else {
		if len(word) == 1 {
			node.endTag = true
			return node
		}
		if node.middle == nil {
			node.middle = &Node{
				value:  "",
				endTag: false,
			}
		}
		node.middle = a.Insert(word[1:], node.middle)
		// fmt.Printf("node.middle %s\n", node.middle.value)
	}
	return node
}

func (a *AutoCompleteTree) AllSuffixes(pattern string, node *Node) []string {
	// root := node
	// fmt.Println(node)
	// for _, r := range pattern {
	// Start:
	// 	fmt.Println("this node", node)
	// 	fmt.Println("compared:", r, node.r)
	// 	if node == nil {
	// 		return nil
	// 	}
	// 	if r < node.r && node.left != nil {
	// 		node = node.left
	// 		goto Start
	// 	}
	// 	if r > node.r && node.right != nil {
	// 		node = node.right
	// 		goto Start
	// 	}
	// 	if r == node.r {
	// 		node = node.middle
	// 		fmt.Println("Value: ", fmt.Sprintf("%s%s", pattern, node.value))
	// 	}
	// 	if node.endTag {
	// 		return fmt.Sprintf("%s%s", pattern, node.value)
	// 	}
	// }

	// Version2:
	// var results []string

	// for true {
	// 	if node.endTag {
	// 		results = append(results, fmt.Sprintf("%s%s", pattern, node.value))
	// 		fmt.Println(results)
	// 		break
	// 		// node = root
	// 	} else if node.left != nil {
	// 		node = node.left
	// 	} else if node.right != nil {
	// 		node = node.right
	// 	} else if node.middle != nil {
	// 		node = node.middle
	// 		pattern = fmt.Sprintf("%s%s", pattern, node.value)
	// 	}
	// }
	// fmt.Println(results)

	// Version1:
	// if node.endTag {
	// 	// fmt.Println("endTag: ", pattern, node.value)
	// 	results = append(results, fmt.Sprintf("%s%s", pattern, node.value))
	// } else if node.left != nil {
	// 	// fmt.Println("left")
	// 	for _, word := range a.AllSuffixes(pattern, node.left, results) {
	// 		results = append(results, word)
	// 	}
	// } else if node.right != nil {
	// 	// fmt.Println("right")
	// 	fmt.Println("right node", node.right)
	// 	for _, word := range a.AllSuffixes(pattern, node.right, results) {
	// 		fmt.Printf("word: %s \n", word)
	// 		results = append(results, word)
	// 	}
	// } else if node.middle != nil {
	// 	// fmt.Println("middle")
	// 	for _, word := range a.AllSuffixes(fmt.Sprintf("%s%s", pattern, node.value), node.middle, results) {
	// 		results = append(results, word)
	// 	}
	// }
	// fmt.Println("result", results)
	// return append(results[fmt.Sprintf("%s%s", pattern, node.value)], a.AllSuffixes(fmt.Sprintf("%s%s", pattern, node.value), node.middle, results)...)

	return results
}

func (a *AutoCompleteTree) Find(pattern []string) {
	pat := string(pattern[0])

	wordChan := a.find_(pat)
	fmt.Println(wordChan)
	// for word := range wordChan {
	// 	fmt.Printf("Founded value: %s \n", word)
	// }
}

func (a *AutoCompleteTree) find_(pat string) []string {
	node := a.node
	for _, runedChar := range pat {
		for true {
			if runedChar > node.r {
				node = node.right
			} else if runedChar < node.r {
				node = node.left
			} else {
				node = node.middle
				break
			}
			if node == nil {
				break
			}
		}
	}
	fmt.Println("pars", pat, node)

	b := a.AllSuffixes(pat, node)
	fmt.Println("cccc", b)
	return []string{}
}

// NewAutoCompleteTree define construction
func NewAutoCompleteTree(wordList []string) *AutoCompleteTree {
	t := &AutoCompleteTree{
		node: &Node{
			value:  "",
			endTag: false,
		},
	}
	t.init(wordList)
	// fmt.Printf("Value: %s\n", t.node.right.right.value)
	// fmt.Printf("Value: %s\n", t.node.right.right.middle.right.value)
	// fmt.Printf("Value: %s\n", t.node.right.right.middle.right.middle.value)

	// fmt.Printf("Value: %s \n", t.node.right.right.value)
	// fmt.Printf("Value: %s\n", t.node.right.right.middle.value)
	// fmt.Printf("Value: %s\n", t.node.right.right.middle.middle.value)
	// fmt.Printf("Value: %s\n", t.node.right.right.middle.middle.middle.value)
	// fmt.Printf("Value: %s\n", t.node.right.right.middle.middle.middle.middle.value)
	fmt.Printf("----\n")
	t.Find([]string{"c"})
	return t
}
