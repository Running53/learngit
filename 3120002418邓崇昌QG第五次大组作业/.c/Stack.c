#include"BinarySortTree.h"
Status initLStack(LinkStack *s){//��ʼ��ջ
	s->top = (StackNode*)malloc(sizeof(StackNode));
	if(!s->top)
		return false;
	s->top = NULL;
	s->count = 0;
//	f = 0;
	return true;
}

Status isEmptyLStack(LinkStack *s){//�ж�ջ�Ƿ�Ϊ��
	if(s->top == NULL)//���ջ����ָ����ָ��գ���ջ��
	{
		return true;
	}
	else
	{
		return false;
}
}

NodePtr getTopLStack(LinkStack *s){//�õ�ջ��Ԫ��
	if(s->top == NULL)
	{
		return false;
	}
	else
	{
//	    printf("s");
	    LinkStackPtr p = s->top;
	    return p->node;
//	    printf("9");
//		int ee;
//		LinkStackPtr p = s->top;
//		ee = p->data;
//		printf("ջ��Ԫ��Ϊ��%d",ee);
//		return SUCCESS;
	}
}


Status pushLStack(LinkStack *s,NodePtr node){//��ջ
	LinkStackPtr p = (LinkStackPtr)malloc(sizeof(struct StackNode));
	if(!p)
		return false;
	else{
//        printf("%d ",node->value);
    	p->node = node;
   	 	p->next = s->top;
    	s->top = p;
    	s->count++;
    	return true;
	}
}

Status popLStack(LinkStack *s){//��ջ
    LinkStackPtr p;
//    int e;
    if(s->top == NULL)
		return false;
    p = s->top;
//    e = p->data;
//    printf("��ջԪ��Ϊ��%d",e);
    s->top = p->next;
    s->count--;
    free(p);
    return true;
}
