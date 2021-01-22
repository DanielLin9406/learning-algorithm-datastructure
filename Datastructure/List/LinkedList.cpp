#include <iostream>
using std::cout;
using std::endl;

class LinkedList;

class ListNode{
private:
    int data;
    ListNode *next;
public:
    ListNode():data(0),next(0){};
    ListNode(int a):data(a),next(0){};

    friend class LinkedList;
};

class LinkedList{
private:
  ListNode *first;
public:
    LinkedList():first(0){};
    void PrintList();
    void Push_front(int x);
    void Push_back(int x);  
    void Delete(int x);
    void Clear();
    void Reverse();   
};

void LinkedList::PrintList(){
  if (first == 0) {
    cout << "List is empty.\n";
    return;
  }
  ListNode *current = first;
  while (current != 0) {
    cout << current->data << " ";
    current = current->next;
  }
  cout << endl; 
};