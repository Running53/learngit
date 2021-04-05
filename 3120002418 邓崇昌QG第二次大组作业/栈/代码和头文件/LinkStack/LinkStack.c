#include "LinkStack.h"
int flag=0;
int judge=0;

void mainmenuface()
{
	printf("--------------------------------------------\n");
	printf("-------------	1.��ʼ��ջ  	------------\n");
	printf("-------------	2.�ж�ջ�Ƿ�Ϊ��------------\n");
	printf("-------------	3.���ջ��Ԫ��	------------\n");
	printf("-------------	4.���ջ		------------\n");
	printf("-------------	5.����ջ		------------\n");
	printf("-------------	6.���ջ����    ------------\n");
	printf("-------------	7.��ջ          ------------\n");
	printf("-------------	8.��ջ			------------\n");
	printf("-------------	9.����ջ		------------\n");
	printf("--------------------------------------------\n");
}

int checkout(int *val)	//������ 
{
	char a[50]={0};
	int i=0,flags=0,j=0;
	scanf("%s",a);		//���û����� 
	for(i=0;a[i]!='\0';i++)
	{
		if(a[i]<'0'||a[i]>'9')		//���μ���û������ÿһ���ַ��Ƿ���ȷ 
		{
			flags=1;
		} 
	}
	if(flags==1)
	{
		judge=0;
		return 1;	//˵���û������벢�Ǵ����� 
	}
	judge=1;
	*val=atoi(a); 
	return 0;
} 

Status initLStack(LinkStack *s)//��ʼ��ջ
{
	flag=1;
	s=(LinkStack *)malloc(sizeof(LinkStack));
	s->top=NULL;	//�����������ջΪ��ջ 
	s->count=0;		//���ڼ�������ջ�Ĵ�С
	printf("ջ��ʼ���ɹ���\n");
	return SUCCESS; 
}

Status isEmptyLStack(LinkStack *s)//�ж�ջ�Ƿ�Ϊ��
{
 	if(s->top==NULL)
 	{
 	   	printf("ջΪ�գ�\n");
 	   	return SUCCESS;
	}
 	else
	{
	 	printf("ջ��Ϊ�գ�\n");
	 	return SUCCESS;
	} 	
}


Status getTopLStack(LinkStack *s,ElemType *e)//�õ�ջ��Ԫ��
{
	   if(s->top==NULL)
	   {
	   	printf("ջΪ�գ���ջ��Ԫ�أ�\n");
	    return ERROR; 
	   }
 	   *e=s->top->data;		//topָ����ָ�ļ�Ϊջ��Ԫ�� 
 	   printf("�ɹ��ҵ�ջ��Ԫ�أ�����ֵΪ%d\n",*e);
 	   return SUCCESS;
}

Status clearLStack(LinkStack *s)//���ջ
{
	if(s->top==NULL)
	{
		printf("ջΪ�գ�����Ҫ��գ�\n");
		return ERROR;
	}
	do
	{	
		int data;
	  	popLStack(s,&data);//��ջ�ڵ�Ԫ�����γ�ջ
	}while(s->top!=NULL);
	printf("ջ�ѳɹ���գ�\n");
	return SUCCESS;
}

Status destroyLStack(LinkStack *s)//����ջ
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
 	   	printf("ջ�ѳɹ����٣�\n");
 	   	return SUCCESS;
}

Status LStackLength(LinkStack *s,int *length)//���ջ����
{
 	   LinkStackPtr p1;
 	   *length=0;
 	   p1=s->top;
 	   if(p1==NULL)
	   {
 	   	 printf("ջΪ�գ�����Ϊ0��\n");
 	   	 return ERROR;
	   }
 	   
 	   while(p1!=NULL)
 	   {
 	   		p1=p1->next;	//������ջ�õ����� 
			*length=*length+1;		  
       }
       printf("ջ��Ϊ�գ�����Ϊ%d\n",*length);
       return SUCCESS;
}

Status pushLStack(LinkStack *s,ElemType data)//��ջ
{
 	   LinkStackPtr S=(LinkStackPtr)malloc(sizeof(StackNode));
 	   S->data=data;
 	   S->next=s->top;
 	   s->top=S;	//���½ڵ�S��ֵ��ջ��ָ�� 
 	   s->count++;
 	   printf("��ջ�ɹ���\n");
 	   return SUCCESS;
}

Status popLStack(LinkStack *s,ElemType *data)//��ջ
{
 	   LinkStackPtr p;
	   if(s->top==NULL)
	   {
	   	printf("ջΪ�գ�����ִ�г�ջָ�\n");
		return ERROR;			   
       } 
       p=s->top;
       *data=s->top->data;
       s->top=p->next;
       free(p);
       s->count--;
       printf("��ջ�ɹ�����ջ��Ԫ��Ϊ��%d\n",*data);
       return SUCCESS;
}

Status traversal(LinkStack *s)//����ջ 
{
 	   if(s->top==NULL)
	   {
	   	printf("ջΪ�գ�����ִ�б���ָ�\n");
		return ERROR;			   
       } 
       printf("ջ�е�Ԫ��Ϊ��\n");
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
