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

func main() {
	tree.NewAutoCompleteTree(wordList)
}
