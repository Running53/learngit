#include "SqStack.h"
int judge=0;
int flag=0;
void mainmenuface()		//菜单栏 
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
	int i=0,flag=0,j=0;
	scanf("%s",a);		//让用户输入 
	for(i=0;a[i]!='\0';i++)
	{
		if(a[i]<'0'||a[i]>'9')		//依次检查用户输入的每一个字符是否正确 
		{
			flag=1;
		}
		else if(a[i]==' ')
		{
			flag=1;
	 	} 
	}
	if(flag==1)
	{
		judge=0;
		return 1;	//说明用户的输入并非纯数字 
	}
	judge=1;
	*val=atoi(a); 
	return 0;
} 

Status initStack(SqStack *s,int sizes)	//初始化栈
{
	flag=1;
	s->elem=(int *)malloc(sizes*sizeof(int));
	s->top=-1;		//表明这是一个空栈，代表栈的所以位置都可用 
	s->size=sizes; 	//给栈一个大小 
	printf("初始化成功！\n");
	return SUCCESS;
}	

Status isEmptyStack(SqStack *s)	//判断栈是否为空
{
	if(s->top==-1)
	{
		printf("栈为空！\n");
		return SUCCESS;
	}
	else 
	{
		return SUCCESS;
	}
}

Status getTopStack(SqStack *s,ElemType *e)	//得到栈顶元素	
{
	if(s->top==-1)
	{
		printf("栈为空，得不到栈顶元素！\n");
		return ERROR;
	}
	*e=s->elem[s->top];
	printf("已得到栈顶元素，栈顶元素数值为%d\n",*e);
	return SUCCESS;
}

Status clearStack(SqStack *s)	//清空栈
{
	int a;
	if(s->top==-1)
	{
		printf("栈为空栈，不需要清空！\n");
		return ERROR;
	}
	do
	{
	  	popStack(s,&a);
	}while(s->top!=-1);
	printf("清栈成功！\n");
	return SUCCESS;
}

Status destroyStack(SqStack *s)	//销毁栈
{
	flag=0;
	free(s->elem);
	s->elem=NULL;
	s->top=-1;
	s->size=0;
	printf("栈销毁成功！\n");
	return SUCCESS;
}

Status stackLength(SqStack *s,int *length) //检测栈长度
{
	if(s->top==-1)
	{
		printf("栈是空栈,长度为0!\n"); 
		*length=0;
		return SUCCESS;
	}
	else
	{
		printf("栈不是空栈，长度为：%d\n",s->top+1);
		*length=s->top+1;
		return SUCCESS;
	} 
}

Status pushStack(SqStack *s,ElemType data)	//入栈
{
	if(s->top==(s->size-1))
	{
		printf("栈已经满了,不可入栈！\n");
		return ERROR;
	}
	s->elem[s->top+1]=data;
	(s->top)++; 
	printf("入栈成功！\n");
	return SUCCESS;
}

Status popStack(SqStack *s,ElemType *data)	//出栈
{
	if(s->top==-1)
	{
		printf("栈为空，不需要出栈！\n");
		return ERROR;
	}
		*data=s->elem[s->top];
		s->top--;
		printf("出栈成功！出栈的元素为%d\n",*data);
		return SUCCESS;
}

Status traversal(SqStack *s)//遍历栈 
{
 	   if(s->top==-1)
 	   {
 	   	printf("栈为空，不能够遍历！\n");
		return ERROR;
       }
       printf("栈中的元素为：\n");
       int i=s->top;
       for(;i!=-1;i--)
       {
       	printf("%d ",s->elem[i]);
	   }
	   printf("\n");
       return SUCCESS;
} 
