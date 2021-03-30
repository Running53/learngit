#ifndef LINKEDLIST_H_INCLUDED
#define LINKEDLIST_H_INCLUDED
#include <stdio.h>
#include <stdlib.h>
typedef int ElemType;

typedef struct LNode {
	ElemType data;
  	struct LNode *next;
} LNode, *LinkedList;

typedef enum Status {
	ERROR,
	SUCCESS
} Status;

int inputCheck(int *val);

void mainmenuface();  		//菜单栏 

void (*visit)(ElemType e);  //函数指针用于输出节点数据 

void select1 ();

void select2 ();

void print (ElemType e);

Status InitList(LinkedList *L);

void DestroyList(LinkedList *L);

Status InsertList(LNode *p, LNode *q);

Status DeleteList(LNode *p, ElemType *e);

void TraverseList(LinkedList L, void (*visit)(ElemType e));

Status SearchList(LinkedList L, ElemType e);

Status ReverseList(LinkedList *L);

Status IsLoopList(LinkedList L);

LNode* ReverseEvenList(LinkedList *L);

LNode* FindMidNode(LinkedList *L);

#endif
