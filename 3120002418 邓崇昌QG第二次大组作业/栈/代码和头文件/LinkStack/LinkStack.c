#include "LinkStack.h"
int flag=0;
int judge=0;

void mainmenuface()
{
	printf("--------------------------------------------\n");
	printf("-------------	1.初始化栈  	------------\n");
	printf("-------------	2.判断栈是否为空------------\n");
	printf("-------------	3.输出栈顶元素	------------\n");
	printf("-------------	4.清空栈		------------\n");
	printf("-------------	5.销毁栈		------------\n");
	printf("-------------	6.检测栈长度    ------------\n");
	printf("-------------	7.入栈          ------------\n");
	printf("-------------	8.出栈			------------\n");
	printf("-------------	9.遍历栈		------------\n");
	printf("--------------------------------------------\n");
}

int checkout(int *val)	//输入检测 
{
	char a[50]={0};
	int i=0,flags=0,j=0;
	scanf("%s",a);		//让用户输入 
	for(i=0;a[i]!='\0';i++)
	{
		if(a[i]<'0'||a[i]>'9')		//依次检查用户输入的每一个字符是否正确 
		{
			flags=1;
		} 
	}
	if(flags==1)
	{
		judge=0;
		return 1;	//说明用户的输入并非纯数字 
	}
	judge=1;
	*val=atoi(a); 
	return 0;
} 

Status initLStack(LinkStack *s)//初始化栈
{
	flag=1;
	s=(LinkStack *)malloc(sizeof(LinkStack));
	s->top=NULL;	//表明现在这个栈为空栈 
	s->count=0;		//用于计数现在栈的大小
	printf("栈初始化成功！\n");
	return SUCCESS; 
}

Status isEmptyLStack(LinkStack *s)//判断栈是否为空
{
 	if(s->top==NULL)
 	{
 	   	printf("栈为空！\n");
 	   	return SUCCESS;
	}
 	else
	{
	 	printf("栈不为空！\n");
	 	return SUCCESS;
	} 	
}


Status getTopLStack(LinkStack *s,ElemType *e)//得到栈顶元素
{
	   if(s->top==NULL)
	   {
	   	printf("栈为空，无栈顶元素！\n");
	    return ERROR; 
	   }
 	   *e=s->top->data;		//top指针所指的极为栈顶元素 
 	   printf("成功找到栈顶元素！它的值为%d\n",*e);
 	   return SUCCESS;
}

Status clearLStack(LinkStack *s)//清空栈
{
	if(s->top==NULL)
	{
		printf("栈为空，不需要清空！\n");
		return ERROR;
	}
	do
	{	
		int data;
	  	popLStack(s,&data);//将栈内的元素依次出栈
	}while(s->top!=NULL);
	printf("栈已成功清空！\n");
	return SUCCESS;
}

Status destroyLStack(LinkStack *s)//销毁栈
{
	   	flag=0;					   
 	   	LinkStackPtr p2;
 	   	p2=s->top;
 	   	while(p2!=NULL)
 	   	{
 	   		s->top=p2->next;
 	   		free(p2);
 	   		p2=s->top;
		}
 	   	free(s->top);
 	   	s->top=NULL;
 	   	printf("栈已成功销毁！\n");
 	   	return SUCCESS;
}

Status LStackLength(LinkStack *s,int *length)//检测栈长度
{
 	   LinkStackPtr p1;
 	   *length=0;
 	   p1=s->top;
 	   if(p1==NULL)
	   {
 	   	 printf("栈为空，长度为0！\n");
 	   	 return ERROR;
	   }
 	   
 	   while(p1!=NULL)
 	   {
 	   		p1=p1->next;	//遍历链栈得到长度 
			*length=*length+1;		  
       }
       printf("栈不为空，长度为%d\n",*length);
       return SUCCESS;
}

Status pushLStack(LinkStack *s,ElemType data)//入栈
{
 	   LinkStackPtr S=(LinkStackPtr)malloc(sizeof(StackNode));
 	   S->data=data;
 	   S->next=s->top;
 	   s->top=S;	//将新节点S赋值给栈顶指针 
 	   s->count++;
 	   printf("入栈成功！\n");
 	   return SUCCESS;
}

Status popLStack(LinkStack *s,ElemType *data)//出栈
{
 	   LinkStackPtr p;
	   if(s->top==NULL)
	   {
	   	printf("栈为空，不能执行出栈指令！\n");
		return ERROR;			   
       } 
       p=s->top;
       *data=s->top->data;
       s->top=p->next;
       free(p);
       s->count--;
       printf("出栈成功！出栈的元素为：%d\n",*data);
       return SUCCESS;
}

Status traversal(LinkStack *s)//遍历栈 
{
 	   if(s->top==NULL)
	   {
	   	printf("栈为空，不能执行遍历指令！\n");
		return ERROR;			   
       } 
       printf("栈中的元素为：\n");
       LinkStackPtr p;
       p=s->top;
       do
       {
       	printf("%d ",p->data);
       	p=p->next;
	   }while(p!=NULL);
	   printf("\n");
	   return SUCCESS;
} 
