#include "AQueue.h" 
extern int flag;
extern int j;
int main()
{
	int options;
	AQueue q; 
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
			InitAQueue(&q);//��ʼ������
			break; 
			
		case 2:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�����ٲ�����\n");
			}
			else
			DestoryAQueue(&q);//���ٶ��� 
			break;
			
		case 3:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ���ж��Ƿ�Ϊ��������\n");
			}
			else
			IsFullAQueue(&q);//�ж��Ƕ��з�Ϊ������Ϊ�ձ�������Ԫ�����ֵ 
			break;
			
		case 4:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ���ж��Ƿ�Ϊ�ղ�����\n");
			}
			else
			IsEmptyAQueue(&q);//�������Ƿ�Ϊ�� ����Ϊ�ձ����������ֵ 
			break;
			
		case 5:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�в鿴��ͷԪ�ز�����\n");
			}
			else
			{
			void *e=NULL; 
			GetHeadAQueue(&q,e);//�鿴��ͷԪ�� 
			}			
			break;
			
		case 6:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�в鿴��ͷ���Ȳ�����\n");
			}
			else
			LengthAQueue(&q);//������г��� 
			break;
			
			case 7:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ����Ӳ�����\n");
			}
			else
			select(&q); //ѡ��������������Ȼ��ʹ����� 	
			break;
			
			case 8:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�г��Ӳ�����\n");
			}
			else	
			DeAQueue(&q);//���в��� 
			break;
			
			case 9:
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
			ClearAQueue(&q);//��ն��� 
			break;
			
			case 10:
			system("cls");
			mainmenuface();
			if(flag==0)
			{
				printf("����δ��ʼ�����л�����ѱ����٣��޷�ִ�б������в�����\n");
			}	
			else
			TraverseAQueue(&q,APrint);//��������ӡ���� 
			break;
			
			default:
			printf("����������ֲ�����Ч��Χ�ڣ����������룺\n");
	}
	}
	return 0;
}
