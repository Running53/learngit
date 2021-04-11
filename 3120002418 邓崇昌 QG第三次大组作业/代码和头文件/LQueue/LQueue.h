#ifndef LQUEUE_H_INCLUDED
#define LQUEUE_H_INCLUDED
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
typedef struct node
{
    void *data;  
    struct node *next;            //ָ��ǰ������һ���
    int type1;//����ÿ���ڵ���������� 
} Node;

typedef struct Lqueue
{
    Node *front;                   //��ͷ
    Node *rear;                    //��β  
    size_t length;            //���г���
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


