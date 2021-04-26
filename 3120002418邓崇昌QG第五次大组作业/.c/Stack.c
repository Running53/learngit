#include"BinarySortTree.h"
Status initLStack(LinkStack *s){//初始化栈
	s->top = (StackNode*)malloc(sizeof(StackNode));
	if(!s->top)
		return false;
	s->top = NULL;
	s->count = 0;
//	f = 0;
	return true;
}

Status isEmptyLStack(LinkStack *s){//判断栈是否为空
	if(s->top == NULL)//如果栈顶的指针域指向空，则栈空
	{
		return true;
	}
	else
	{
		return false;
}
}

NodePtr getTopLStack(LinkStack *s){//得到栈顶元素
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
//		printf("栈顶元素为：%d",ee);
//		return SUCCESS;
	}
}


Status pushLStack(LinkStack *s,NodePtr node){//入栈
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

Status popLStack(LinkStack *s){//出栈
    LinkStackPtr p;
//    int e;
    if(s->top == NULL)
		return false;
    p = s->top;
//    e = p->data;
//    printf("出栈元素为：%d",e);
    s->top = p->next;
    s->count--;
    free(p);
    return true;
}
