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
		printf("����������Ҫ�����ı�Ž��в�����\n"); 
		while(checkout(&options)==0)
		{
			printf("�����������������:\n");
		}
	switch(options)
	{
		case 1:
			system("cls");
			mainmenuface();
			InitLQueue(&q);//��ʼ������
			break; 
			
		case 2:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�����ٲ�����\n");
			}
			else
			DestoryLQueue(&q);//���ٶ��� 
			break;
			
		case 3:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ���ж��Ƿ�Ϊ�ղ�����\n");
			}
			else
			IsEmptyLQueue(&q);//�������Ƿ�Ϊ�� ����Ϊ�ձ����������ֵ 
			break;
			
		case 4:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�в鿴��ͷԪ�ز�����\n");
			}
			else
			{
			void *e=NULL; 
			GetHeadLQueue(&q,e);//�鿴��ͷԪ�� 
			}			
			break;
			
		case 5:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�в鿴��ͷ���Ȳ�����\n");
			}
			else
			printf("���еĳ���Ϊ%d\n",LengthLQueue(&q));//������г��� 	
			break;
			
		case 6:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ����Ӳ�����\n");
			}
			else
			{
			  	select(&q); //ѡ��������������Ȼ��ʹ����� 	
			  	printf("\n");
		 	}				
			break;
			
		case 7:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�г��Ӳ�����\n");
			}
			else	
			DeLQueue(&q);//���в��� 
			break;
			
		case 8:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�г��Ӳ�����\n");
			}
			else if(q.front==q.rear)
			{
				printf("����Ϊ�գ�����Ҫ��գ�\n");
			}
			else	
			ClearLQueue(&q);//��ն��� 
			break;
			
		case 9:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�б������в�����\n");
			}	
			else
			TraverseLQueue(&q,LPrint);//��������ӡ���� 
			break;
			
			default:
			printf("����������ֲ�����Ч��Χ�ڣ����������룺\n");
	}
	}
	return 0;
}

