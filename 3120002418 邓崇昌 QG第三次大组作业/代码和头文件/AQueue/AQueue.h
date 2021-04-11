
#ifndef AQUEUE_H_INCLUDED
#define AQUEUE_H_INCLUDED

#include <stdio.h>
#include <stdlib.h>
#include <string.h> 

#define MAXQUEUE 10

typedef struct Aqueue
{
    void *data[MAXQUEUE];      //数据域
    int front;
    int rear;
    size_t length;        //队列长度
} AQueue;

typedef enum
{
  FALSE=0, TRUE=1
} Status;
char type;
char datatype[MAXQUEUE];

void mainmenuface();//菜单栏 

Status checkout(int *val); //检查用户输入是否正确 

void InitAQueue(AQueue *Q);//初始化队列 

void DestoryAQueue(AQueue *Q);//销毁队列 

Status IsFullAQueue(const AQueue *Q);//判断队列是否满了 

Status IsEmptyAQueue(const AQueue *Q);//判断队列是否为空 

Status GetHeadAQueue(AQueue *Q, void *e);	//	输出队列的首项元素 

int LengthAQueue(AQueue *Q);	//输出队列的长度 

Status EnAQueue(AQueue *Q, void *data);	//入列 

Status DeAQueue(AQueue *Q);	//	出列 

void ClearAQueue(AQueue *Q);//	清空队列 

Status TraverseAQueue(const AQueue *Q, void (*foo)(void *q));	//遍历并输出队列元素 

Status secelt(AQueue *Q);//让用户选择入列的类型 


void APrint(void *q);	

#endif 


