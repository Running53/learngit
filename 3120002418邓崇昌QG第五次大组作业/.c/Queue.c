#include"BinarySortTree.h"

void InitLQueue(LQueue *Q)//初始化队列
{
    QNode *p = (QNode *)malloc(sizeof(QNode));
    if(!p)
    {
        printf("动态分配内存失败，无法初始化队列！\n");
        return;
    }
    p->next = NULL;
    Q->front = p;
    Q->rear = p;
    Q->length = 0;
    return;
}
Status IsEmptyLQueue(const LQueue *Q)//判断是否为空
{
    return ( Q->front == Q->rear ? true:false);
}
NodePtr GetHeadLQueue(LQueue *Q)//得到栈顶元素
{
    if(IsEmptyLQueue(Q))
    {
        printf("队列为空，无法获取队头元素！\n");
        return false;
    }
    return Q->front->next->node;
}
Status EnLQueue(LQueue *Q,NodePtr node)//入队
{
    QNode *p = (QNode *)malloc(sizeof(QNode));
    if(!p)
    {
        printf("动态分配内存失败，无法进行入队操作！\n");
        return false;
    }
    p->node = node;
	p->next = NULL;
	Q->rear->next = p;
	Q->rear = p;
//    Q->length++;
    return true;
}
NodePtr DeLQueue(LQueue *Q)//出队
{
    QNode *p = (QNode *)malloc(sizeof(QNode));
    if(IsEmptyLQueue(Q))
    {
        printf("队列为空，无法进行出队操作！\n");
        return false;
    }
    p = Q->front->next;
    Q->front->next = p->next;
    if(Q->rear == p)
        Q->rear = Q->front;
//    printf("出队成功！出队元素为：");
//    static i = 0;
//    LPrint(p->data,datatype[i]);
//    i++;
//    J = i;
//    Q->length--;
    return p->node;
    free(p);
    return TRUE;
}
