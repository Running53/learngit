
#ifndef AQUEUE_H_INCLUDED
#define AQUEUE_H_INCLUDED

#include <stdio.h>
#include <stdlib.h>
#include <string.h> 

#define MAXQUEUE 10

typedef struct Aqueue
{
    void *data[MAXQUEUE];      //������
    int front;
    int rear;
    size_t length;        //���г���
} AQueue;

typedef enum
{
  FALSE=0, TRUE=1
} Status;
char type;
char datatype[MAXQUEUE];

void mainmenuface();//�˵��� 

Status checkout(int *val); //����û������Ƿ���ȷ 

void InitAQueue(AQueue *Q);//��ʼ������ 

void DestoryAQueue(AQueue *Q);//���ٶ��� 

Status IsFullAQueue(const AQueue *Q);//�ж϶����Ƿ����� 

Status IsEmptyAQueue(const AQueue *Q);//�ж϶����Ƿ�Ϊ�� 

Status GetHeadAQueue(AQueue *Q, void *e);	//	������е�����Ԫ�� 

int LengthAQueue(AQueue *Q);	//������еĳ��� 

Status EnAQueue(AQueue *Q, void *data);	//���� 

Status DeAQueue(AQueue *Q);	//	���� 

void ClearAQueue(AQueue *Q);//	��ն��� 

Status TraverseAQueue(const AQueue *Q, void (*foo)(void *q));	//�������������Ԫ�� 

Status secelt(AQueue *Q);//���û�ѡ�����е����� 


void APrint(void *q);	

#endif 


