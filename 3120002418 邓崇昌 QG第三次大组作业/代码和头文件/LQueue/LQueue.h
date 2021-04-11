#ifndef LQUEUE_H_INCLUDED
#define LQUEUE_H_INCLUDED
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
typedef struct node
{
    void *data;  
    struct node *next;            //指向当前结点的下一结点
    int type1;//标明每个节点的数据类型 
} Node;

typedef struct Lqueue
{
    Node *front;                   //队头
    Node *rear;                    //队尾  
    size_t length;            //队列长度
} LQueue;

typedef enum
{
    FALSE=0, TRUE=1
} Status;

char type;	
				
char datatype[30];			

Status select(LQueue *Q);

void mainmenuface();

Status checkout(int *val);

void InitLQueue(LQueue *Q);

void DestoryLQueue(LQueue *Q);

Status IsEmptyLQueue(const LQueue *Q);

Status GetHeadLQueue(LQueue *Q, void *e);

int LengthLQueue(LQueue *Q);

Status EnLQueue(Node *Q, void *datas);

Status DeLQueue(LQueue *Q);

void ClearLQueue(LQueue *Q);

Status TraverseLQueue(const LQueue *Q, void (*foo)(void *q));

void LPrint(void *q);

#endif 


