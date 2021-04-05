#include "SqStack.h"
int judge=0;
int flag=0;
void mainmenuface()		//�˵��� 
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
	int i=0,flag=0,j=0;
	scanf("%s",a);		//���û����� 
	for(i=0;a[i]!='\0';i++)
	{
		if(a[i]<'0'||a[i]>'9')		//���μ���û������ÿһ���ַ��Ƿ���ȷ 
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
		return 1;	//˵���û������벢�Ǵ����� 
	}
	judge=1;
	*val=atoi(a); 
	return 0;
} 

Status initStack(SqStack *s,int sizes)	//��ʼ��ջ
{
	flag=1;
	s->elem=(int *)malloc(sizes*sizeof(int));
	s->top=-1;		//��������һ����ջ������ջ������λ�ö����� 
	s->size=sizes; 	//��ջһ����С 
	printf("��ʼ���ɹ���\n");
	return SUCCESS;
}	

Status isEmptyStack(SqStack *s)	//�ж�ջ�Ƿ�Ϊ��
{
	if(s->top==-1)
	{
		printf("ջΪ�գ�\n");
		return SUCCESS;
	}
	else 
	{
		return SUCCESS;
	}
}

Status getTopStack(SqStack *s,ElemType *e)	//�õ�ջ��Ԫ��	
{
	if(s->top==-1)
	{
		printf("ջΪ�գ��ò���ջ��Ԫ�أ�\n");
		return ERROR;
	}
	*e=s->elem[s->top];
	printf("�ѵõ�ջ��Ԫ�أ�ջ��Ԫ����ֵΪ%d\n",*e);
	return SUCCESS;
}

Status clearStack(SqStack *s)	//���ջ
{
	int a;
	if(s->top==-1)
	{
		printf("ջΪ��ջ������Ҫ��գ�\n");
		return ERROR;
	}
	do
	{
	  	popStack(s,&a);
	}while(s->top!=-1);
	printf("��ջ�ɹ���\n");
	return SUCCESS;
}

Status destroyStack(SqStack *s)	//����ջ
{
	flag=0;
	free(s->elem);
	s->elem=NULL;
	s->top=-1;
	s->size=0;
	printf("ջ���ٳɹ���\n");
	return SUCCESS;
}

Status stackLength(SqStack *s,int *length) //���ջ����
{
	if(s->top==-1)
	{
		printf("ջ�ǿ�ջ,����Ϊ0!\n"); 
		*length=0;
		return SUCCESS;
	}
	else
	{
		printf("ջ���ǿ�ջ������Ϊ��%d\n",s->top+1);
		*length=s->top+1;
		return SUCCESS;
	} 
}

Status pushStack(SqStack *s,ElemType data)	//��ջ
{
	if(s->top==(s->size-1))
	{
		printf("ջ�Ѿ�����,������ջ��\n");
		return ERROR;
	}
	s->elem[s->top+1]=data;
	(s->top)++; 
	printf("��ջ�ɹ���\n");
	return SUCCESS;
}

Status popStack(SqStack *s,ElemType *data)	//��ջ
{
	if(s->top==-1)
	{
		printf("ջΪ�գ�����Ҫ��ջ��\n");
		return ERROR;
	}
		*data=s->elem[s->top];
		s->top--;
		printf("��ջ�ɹ�����ջ��Ԫ��Ϊ%d\n",*data);
		return SUCCESS;
}

Status traversal(SqStack *s)//����ջ 
{
 	   if(s->top==-1)
 	   {
 	   	printf("ջΪ�գ����ܹ�������\n");
		return ERROR;
       }
       printf("ջ�е�Ԫ��Ϊ��\n");
       int i=s->top;
       for(;i!=-1;i--)
       {
       	printf("%d ",s->elem[i]);
	   }
	   printf("\n");
       return SUCCESS;
} 
