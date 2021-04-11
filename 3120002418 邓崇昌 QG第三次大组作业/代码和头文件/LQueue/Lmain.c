#include "LQueue.h" 
extern int flag;
extern int j;
extern LQueue q;
int main()
{
	int options;	 
	q.front=NULL;
	q.rear=NULL;
	mainmenuface();
	while(1)
	{
		printf("请输入您想要操作的编号进行操作：\n"); 
		while(checkout(&options)==0)
		{
			printf("输入错误！请重新输入:\n");
		}
	switch(options)
	{
		case 1:
			system("cls");
			mainmenuface();
			InitLQueue(&q);//初始化队列
			break; 
			
		case 2:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行销毁操作！\n");
			}
			else
			DestoryLQueue(&q);//销毁队列 
			break;
			
		case 3:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行判断是否为空操作！\n");
			}
			else
			IsEmptyLQueue(&q);//检查队列是否为空 ，不为空遍历数列输出值 
			break;
			
		case 4:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行查看队头元素操作！\n");
			}
			else
			{
			void *e=NULL; 
			GetHeadLQueue(&q,e);//查看队头元素 
			}			
			break;
			
		case 5:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行查看队头长度操作！\n");
			}
			else
			printf("队列的长度为%d\n",LengthLQueue(&q));//输出队列长度 	
			break;
			
		case 6:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行入队操作！\n");
			}
			else
			{
			  	select(&q); //选择入列数据类型然后使其入队 	
			  	printf("\n");
		 	}				
			break;
			
		case 7:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行出队操作！\n");
			}
			else	
			DeLQueue(&q);//出列操作 
			break;
			
		case 8:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行出队操作！\n");
			}
			else if(q.front==q.rear)
			{
				printf("队列为空！不需要清空！\n");
			}
			else	
			ClearLQueue(&q);//清空队列 
			break;
			
		case 9:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("您还未初始化队列或队列已被销毁，无法执行遍历队列操作！\n");
			}	
			else
			TraverseLQueue(&q,LPrint);//遍历并打印队列 
			break;
			
			default:
			printf("您输入的数字不在有效范围内！请重新输入：\n");
	}
	}
	return 0;
}

