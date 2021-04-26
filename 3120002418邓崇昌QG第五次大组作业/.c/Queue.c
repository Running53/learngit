#include"BinarySortTree.h"

void InitLQueue(LQueue *Q)//��ʼ������
{
    QNode *p = (QNode *)malloc(sizeof(QNode));
    if(!p)
    {
        printf("��̬�����ڴ�ʧ�ܣ��޷���ʼ�����У�\n");
        return;
    }
    p->next = NULL;
    Q->front = p;
    Q->rear = p;
    Q->length = 0;
    return;
}
Status IsEmptyLQueue(const LQueue *Q)//�ж��Ƿ�Ϊ��
{
    return ( Q->front == Q->rear ? true:false);
}
NodePtr GetHeadLQueue(LQueue *Q)//�õ�ջ��Ԫ��
{
    if(IsEmptyLQueue(Q))
    {
        printf("����Ϊ�գ��޷���ȡ��ͷԪ�أ�\n");
        return false;
    }
    return Q->front->next->node;
}
Status EnLQueue(LQueue *Q,NodePtr node)//���
{
    QNode *p = (QNode *)malloc(sizeof(QNode));
    if(!p)
    {
        printf("��̬�����ڴ�ʧ�ܣ��޷�������Ӳ�����\n");
        return false;
    }
    p->node = node;
	p->next = NULL;
	Q->rear->next = p;
	Q->rear = p;
//    Q->length++;
    return true;
}
NodePtr DeLQueue(LQueue *Q)//����
{
    QNode *p = (QNode *)malloc(sizeof(QNode));
    if(IsEmptyLQueue(Q))
    {
        printf("����Ϊ�գ��޷����г��Ӳ�����\n");
        return false;
    }
    p = Q->front->next;
    Q->front->next = p->next;
    if(Q->rear == p)
        Q->rear = Q->front;
//    printf("���ӳɹ�������Ԫ��Ϊ��");
//    static i = 0;
//    LPrint(p->data,datatype[i]);
//    i++;
//    J = i;
//    Q->length--;
    return p->node;
    free(p);
    return TRUE;
}
