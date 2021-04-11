#include "AQueue.h" 
int flag=0;
int j=0;
void mainmenuface()
{
	printf("----------------------------------------\n");
	printf("----------1.初始化队列------------------\n");
	printf("----------2.销毁队列--------------------\n");
	printf("----------3.检查队列是否已满------------\n");
	printf("----------4.检查队列是否为空------------\n");
	printf("----------5.查看队头元素----------------\n");
	printf("----------6.确定队列长度----------------\n");
	printf("----------7.入队------------------------\n");
	printf("----------8.出队------------------------\n");
	printf("----------9.清空队列--------------------\n");
	printf("----------10.遍历输出队列元素-----------\n");
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
		if(a[i]==' ')
		{
			i++;
			return FALSE;
		}
	}
	*val=atoi(a);
	return TRUE;
}

void InitAQueue(AQueue *Q)
{
	int i=0;
	flag=1;			//falg用于标记队列已经初始化 
	Q->front=0;
	Q->rear=0;		//初始化头尾指针 
	Q->length=MAXQUEUE-1;
	for(i=0;i<MAXQUEUE;i++)
	{
		Q->data[i]=(void *)malloc(20);//用户要存的数据大小我们不知道，给定一个比较大的空间 
	}
	printf("队列初始化成功！\n");
}

void DestoryAQueue(AQueue *Q) //销毁队列 
{
	int i=0;
	flag=0;
	for(i=0;i<MAXQUEUE;i++)
	{
		free(Q->data[i]);	//释放掉存储数据的内存，并防止野指针的生成 
		Q->data[i]==NULL;
	}
	printf("队列销毁成功！\n");
}

Status IsFullAQueue(const AQueue *Q)
{
	if((Q->rear+1)%MAXQUEUE==Q->front)
	printf("队列已满！\n");
	else if(Q->front==Q->rear)
	{
 	    printf("队列未满但为空！\n");
		return FALSE;
	}
	else
	printf("队列未满且不为空！\n");
	TraverseAQueue(Q,APrint);	//输出队列所有元素 	
	return TRUE;
}
  
Status IsEmptyAQueue(const AQueue *Q)
{
	if(Q->front==Q->rear)
	{
 	    printf("队列为空！\n");
		return TRUE;
	}	
	else
	printf("队列不为空！\n");
	TraverseAQueue(Q,APrint);	//输出队列所有元素 
	return FALSE;
}

Status GetHeadAQueue(AQueue *Q, void *e)
{
	if(Q->front==Q->rear)
	{
 	    printf("队列为空！没有队头元素！\n");
		return FALSE;
	}
	else
	{
	j=0;
	memcpy(e,Q->data[Q->front],20);//将队头元素地址的字节拷贝过去 
	printf("队头元素为:\n");
	APrint(Q->data[Q->front]);//输出打印队头元素
	printf("\n");
	return TRUE; 
	}	
}

int LengthAQueue(AQueue *Q)
{
	printf("队列长度为%d\n",(Q->rear-Q->front+MAXQUEUE)%MAXQUEUE);
	return (Q->rear-Q->front+MAXQUEUE)%MAXQUEUE;//输出队列长度 
}

Status EnAQueue(AQueue *Q, void *data)
{
	memcpy(Q->data[Q->rear],data,20);//把元素的数据值赋给队列数组 
	Q->rear=(Q->rear+1)%MAXQUEUE; //让队列尾部指针指向下一个位置 
	printf("入列成功！\n");
//	APrint(Q->data[Q->front]);
	TraverseAQueue(Q,APrint);
	return TRUE;
}	

Status DeAQueue(AQueue *Q)
{
	if(Q->front==Q->rear)//队列为空，不可出列 
	{
		printf("队列为空，不可出列!\n");
		return FALSE;
	}
	
	printf("出列成功！出列元素为：\n");
	j=Q->front;
	APrint(Q->data[Q->front]);
	printf("\n");
	Q->front=(Q->front+1)%MAXQUEUE;//让头指针指向下一个位置 
	return TRUE;
}

void ClearAQueue(AQueue *Q)
{
	while(Q->front!=Q->rear)
	{
		DeAQueue(Q);//出列操作 
	}
	printf("队列清空成功！\n");
}

void APrint(void *q)//打印函数 
{
	if(datatype[j]=='1')
    printf("%d ",*(int*)q);
	if(datatype[j]=='2')
 	printf("%f ",*(double*)q);
  	if(datatype[j]=='3')
   	printf("%c ",*(char*)q);
    if(datatype[j]=='4')
    printf("%s ",(char*)q);
}

Status TraverseAQueue(const AQueue *Q, void (*foo)(void *q))
{
	int i=0;
	if(Q->front==Q->rear)
	{
		printf("队列为空！不可以遍历！\n");
		return FALSE;
	}
	else 
	{
		printf("队列元素依次为：");
		while(i<(Q->rear-Q->front+MAXQUEUE)%MAXQUEUE)
		{
			j=Q->front+i;
			foo(Q->data[Q->front+i]);
			i=(i+1)%MAXQUEUE;
		}
	}
	printf("\n");
	return TRUE;
}

Status select(AQueue *Q)
{
	if((Q->rear+1)%MAXQUEUE==Q->front)//说明队列已经满了，不能入列 
		{
			printf("队列已满，不可入列！\n");
			return FALSE;
		}
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
			j=Q->rear;
			datatype[Q->rear]='1';		
			EnAQueue(Q,&a);
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
			j=Q->rear;
			datatype[Q->rear]='2';
			EnAQueue(Q,&f);
			break;	
        case 3:
			j=Q->rear;
			c=getch();
			datatype[Q->rear]='3';
			EnAQueue(Q,&c);
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
			j=Q->rear;
			datatype[Q->rear]='4';
			EnAQueue(Q,g);
			break;
	}
	return TRUE;
}

