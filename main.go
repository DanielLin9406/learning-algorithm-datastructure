package main

import (
	tree "algorithm/Datastructure"
)

var wordList = []string{
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
}

// var wordList2 = []string{
// 	"abcdef",
// 	"adghjkl",
// 	"bagonet",
// }

func main() {
	tree.NewAutoCompleteTree(wordList)
	// a.Find([]string{"b"})
}
