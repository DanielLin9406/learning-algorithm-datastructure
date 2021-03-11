package tree

// Node define a basic element for
type Node struct {
	value  string
	endTag bool
	left   *Node
	right  *Node
	middle *Node
}
