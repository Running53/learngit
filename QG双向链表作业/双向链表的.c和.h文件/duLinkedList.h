#ifndef DULINKEDLIST_H_INCLUDED
#define DULINKEDLIST_H_INCLUDED
#include <stdio.h>
#include <stdlib.h>

typedef int ElemType;

typedef struct DuLNode {
	ElemType data;
  	struct DuLNode *prior,  *next;
} DuLNode, *DuLinkedList;

typedef enum Status {
	ERROR,
	SUCCESS,
} Status;

int inputCheck(int *val); 

Status InitList_DuL(DuLinkedList *L);

void DestroyList_DuL(DuLinkedList *L);

Status InsertBeforeList_DuL(DuLNode *p, DuLNode *q);

Status InsertAfterList_DuL(DuLNode *p, DuLNode *q);

void select();

void selectdelete();

void print(ElemType e);

Status SearchList(DuLinkedList L, ElemType e);
 
Status DeleteList_DuL(DuLNode *p, ElemType *e);

void TraverseList_DuL(DuLinkedList L, void (*visit)(ElemType e));

#endif
