#include "LQueue.h"
LQueue q;
int j=0;
int flag=0;//用于判断队列有无初始化或销毁 
void mainmenuface()
{
	printf("----------------------------------------\n");
	printf("----------1.初始化队列------------------\n");
	printf("----------2.销毁队列--------------------\n");
	printf("----------3.检查队列是否为空------------\n");
	printf("----------4.查看队头元素----------------\n");
	printf("----------5.确定队列长度----------------\n");
	printf("----------6.入队------------------------\n");
	printf("----------7.出队------------------------\n");
	printf("----------8.清空队列--------------------\n");
	printf("----------9.遍历输出队列元素-----------\n");
	printf("----------------------------------------\n");	
}

Status checkout(int *val)
{
	int i=0;
	char a[100]={0};
	scanf("%s",a);
	for(i=0;a[i]!='\0';i++)	//检查有无输入非法字符 
	{
		if(a[i]<'0'||a[i]>'9')
		{
			return FALSE;
		}
	}
	*val=atoi(a);
	return TRUE;
}

void InitLQueue(LQueue *Q)//初始化队列指针 
{
	flag=1;
	Q->front=(Node *)malloc(sizeof(Node));	//让头指针指向刚分配的头结点内存地址 
	Q->rear=Q->front;
	Q->front->next=NULL;//使头结点指向空 
	printf("初始化成功！\n");
}

void DestoryLQueue(LQueue *Q)
{
	flag=0;
	free(Q->front);
	Q->front=NULL;
	Q->rear=NULL;
	printf("队列销毁成功！\n");
}

Status IsEmptyLQueue(const LQueue *Q)
{
	if(Q->front==Q->rear)
	{
		printf("队列为空！\n");
		return FALSE;
	}
	else
	{
		printf("队列不为空！\n");
		TraverseLQueue(Q,LPrint);//遍历输出队列
		return TRUE; 
	}
}

Status GetHeadLQueue(LQueue *Q, void *e)
{
	if(Q->front==Q->rear)
	{
		printf("队列为空！无法输出队列头元素的值！\n");
		return FALSE;
	}
	else
	{
		j=Q->front->next->type1;
		printf("队列头元素的值为：\n");
		LPrint(Q->front->next->data);
		printf("\n");
	}
	return TRUE;
}

int LengthLQueue(LQueue *Q)
{
	int cnt=0;
	Node *p=Q->front;
	while(p->next!=NULL)
	{
		cnt++;
		p=p->next;
	}
	return cnt;
}

Status select(LQueue *Q)
{
	Node *s=(Node *)malloc(sizeof(Node));
	int selection;
	printf("------输入您想选择入列数据的类型：------\n");
	printf("---------------1.整型-------------------\n");
	printf("---------------2.浮点型-----------------\n");
	printf("---------------3.字符型-----------------\n");
	printf("---------------4.字符串-----------------\n");
	printf("----------------------------------------\n");
 	while(1)
 	{
 		while(checkout(&selection)==0)
		{
			printf("输入错误！请重新输入:\n");
		}
		if(selection<1||selection>4)
		{
			printf("您输入的数字不在有效范围内！请重新输入：\n");
		}
		else
		break;
	}
	int a,i;
	double f;
	char b[20]={0};
	char c;
	char g[20]={0};
	printf("输入您想入列的数据:\n");
    switch(selection)
    {
     	case 1:			
			scanf("%d",&a);
			s->type1=1;
			s->data=(void*)malloc(sizeof(int));		
			EnLQueue(s,&a);
		break;
		case 2: 
			while(1)
			{
				int i=0,flags=0,cnt=0;
				scanf("%s",b);
				if(b[0]=='.')
				{
					flags=1;
				}
				for(i=0;b[i]!='\0';i++)
				{
					if(b[i]=='.')
					cnt++;
					if((b[i]<'0'||b[i]>'9')&&b[i]!='.')
					{
						flags=2; 
					}
					else if((b[i]=='.'&&b[i+1]=='.')||((b[i]=='.')&&b[i+1]=='\0'))
					{
						flags=3;
					}	
				}
			if(flags==1)
			{
			printf("输入错误！第一个符号不能为小数点！请重新输入！\n");
			continue;
			}
			if(flags==2)
			{
			printf("输入错误！不能输入除数字和小数点以外的符号！请重新输入！\n");
			continue;
			}
			if(flags==3)
			{
			printf("输入错误！小数点后面必须带有数字！请重新输入！\n"); 
			continue;
			}
			if(cnt!=1&&cnt!=0)
			{
				printf("输入错误！浮点数只能输入一个小数点！请重新输入!\n");
				continue;  
			}
			break;
			}
			f=atof(b);//把正确的字符转化为浮点数 
			s->type1=2;
			s->data=(void*)malloc(sizeof(double));
			EnLQueue(s,&f);
			break;	
        case 3:
			c=getch();
			s->type1=3;
			s->data=(void*)malloc(sizeof(char));
			EnLQueue(s,&c);
			break;	
        case 4:			
			printf("字符串最大长度为20！\n");
			while(1)
			{
			scanf("%s",g);
			if(g[19]!='\0')
			{
				printf("您输入的字符串大于20，请重新输入：\n");
				for(i=0;i<20;i++)
				g[i]='\0';
				continue;
			}
			break;				
			}
			s->type1=4;
			s->data=(void*)malloc(20);
			EnLQueue(s,g);
			break;
	}
	return TRUE;
}

Status EnLQueue(Node *Q, void *datas)
{
	memcpy(Q->data,datas,20);//把元素的数据值赋给队列结点
	q.rear->next=Q;
	Q->next=NULL;
	q.rear=Q;
	printf("入列成功！");
	TraverseLQueue(&q,LPrint);//遍历并打印队列 
	return TRUE; 
}

Status DeLQueue(LQueue *Q)
{
	Node *p=Q->front->next;
	if(Q->rear==Q->front)
	{
		printf("队列为空！不能执行出列操作！\n");
		return FALSE;
	}
	else if(p==Q->rear)//说明队列中只有一个元素了
	{
		Q->rear=Q->front;
	}
	else 
	{
		Q->front->next=p->next;
	}
	printf("出列成功！出列元素为：\n");
	j=p->type1;
	LPrint(p->data);
	printf("\n");
	free(p);
	p=NULL;
	return TRUE;
}

void ClearLQueue(LQueue *Q)
{
	if(Q->front==Q->rear)
	printf("列表为空！不需要清除！"); 
	else
	{
		while(Q->front!=Q->rear)
		{
			DeLQueue(Q);
		}
	}
	printf("队列清除成功！"); 
}

Status TraverseLQueue(const LQueue *Q, void (*foo)(void *q))
{
	Node *p=Q->front->next;
	if(Q->front==Q->rear)
	{
	printf("队列为空！不能够遍历输出！\n");	
	return FALSE;
	}
	else
	{
		printf("队列的元素值依次为:\n");
		while(p!=NULL)
		{
			j=p->type1;
			foo(p->data);
			p=p->next;
		}
		printf("\n");
	}
	return TRUE;
}

void LPrint(void *q1)
{
	if(j==1)
    printf("%d ",*(int*)q1);
	if(j==2)
 	printf("%f ",*(double*)q1);
  	if(j==3)
   	printf("%c ",*(char*)q1);
    if(j==4)
    printf("%s ",(char*)q1);
}
