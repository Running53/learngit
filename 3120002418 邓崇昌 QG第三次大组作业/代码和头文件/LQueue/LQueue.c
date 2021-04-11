#include "LQueue.h"
LQueue q;
int j=0;
int flag=0;//�����ж϶������޳�ʼ�������� 
void mainmenuface()
{
	printf("----------------------------------------\n");
	printf("----------1.��ʼ������------------------\n");
	printf("----------2.���ٶ���--------------------\n");
	printf("----------3.�������Ƿ�Ϊ��------------\n");
	printf("----------4.�鿴��ͷԪ��----------------\n");
	printf("----------5.ȷ�����г���----------------\n");
	printf("----------6.���------------------------\n");
	printf("----------7.����------------------------\n");
	printf("----------8.��ն���--------------------\n");
	printf("----------9.�����������Ԫ��-----------\n");
	printf("----------------------------------------\n");	
}

Status checkout(int *val)
{
	int i=0;
	char a[100]={0};
	scanf("%s",a);
	for(i=0;a[i]!='\0';i++)	//�����������Ƿ��ַ� 
	{
		if(a[i]<'0'||a[i]>'9')
		{
			return FALSE;
		}
	}
	*val=atoi(a);
	return TRUE;
}

void InitLQueue(LQueue *Q)//��ʼ������ָ�� 
{
	flag=1;
	Q->front=(Node *)malloc(sizeof(Node));	//��ͷָ��ָ��շ����ͷ����ڴ��ַ 
	Q->rear=Q->front;
	Q->front->next=NULL;//ʹͷ���ָ��� 
	printf("��ʼ���ɹ���\n");
}

void DestoryLQueue(LQueue *Q)
{
	flag=0;
	free(Q->front);
	Q->front=NULL;
	Q->rear=NULL;
	printf("�������ٳɹ���\n");
}

Status IsEmptyLQueue(const LQueue *Q)
{
	if(Q->front==Q->rear)
	{
		printf("����Ϊ�գ�\n");
		return FALSE;
	}
	else
	{
		printf("���в�Ϊ�գ�\n");
		TraverseLQueue(Q,LPrint);//�����������
		return TRUE; 
	}
}

Status GetHeadLQueue(LQueue *Q, void *e)
{
	if(Q->front==Q->rear)
	{
		printf("����Ϊ�գ��޷��������ͷԪ�ص�ֵ��\n");
		return FALSE;
	}
	else
	{
		j=Q->front->next->type1;
		printf("����ͷԪ�ص�ֵΪ��\n");
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
	printf("------��������ѡ���������ݵ����ͣ�------\n");
	printf("---------------1.����-------------------\n");
	printf("---------------2.������-----------------\n");
	printf("---------------3.�ַ���-----------------\n");
	printf("---------------4.�ַ���-----------------\n");
	printf("----------------------------------------\n");
 	while(1)
 	{
 		while(checkout(&selection)==0)
		{
			printf("�����������������:\n");
		}
		if(selection<1||selection>4)
		{
			printf("����������ֲ�����Ч��Χ�ڣ����������룺\n");
		}
		else
		break;
	}
	int a,i;
	double f;
	char b[20]={0};
	char c;
	char g[20]={0};
	printf("�����������е�����:\n");
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
			printf("������󣡵�һ�����Ų���ΪС���㣡���������룡\n");
			continue;
			}
			if(flags==2)
			{
			printf("������󣡲�����������ֺ�С��������ķ��ţ����������룡\n");
			continue;
			}
			if(flags==3)
			{
			printf("�������С����������������֣����������룡\n"); 
			continue;
			}
			if(cnt!=1&&cnt!=0)
			{
				printf("������󣡸�����ֻ������һ��С���㣡����������!\n");
				continue;  
			}
			break;
			}
			f=atof(b);//����ȷ���ַ�ת��Ϊ������ 
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
			printf("�ַ�����󳤶�Ϊ20��\n");
			while(1)
			{
			scanf("%s",g);
			if(g[19]!='\0')
			{
				printf("��������ַ�������20�����������룺\n");
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
	memcpy(Q->data,datas,20);//��Ԫ�ص�����ֵ�������н��
	q.rear->next=Q;
	Q->next=NULL;
	q.rear=Q;
	printf("���гɹ���");
	TraverseLQueue(&q,LPrint);//��������ӡ���� 
	return TRUE; 
}

Status DeLQueue(LQueue *Q)
{
	Node *p=Q->front->next;
	if(Q->rear==Q->front)
	{
		printf("����Ϊ�գ�����ִ�г��в�����\n");
		return FALSE;
	}
	else if(p==Q->rear)//˵��������ֻ��һ��Ԫ����
	{
		Q->rear=Q->front;
	}
	else 
	{
		Q->front->next=p->next;
	}
	printf("���гɹ�������Ԫ��Ϊ��\n");
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
	printf("�б�Ϊ�գ�����Ҫ�����"); 
	else
	{
		while(Q->front!=Q->rear)
		{
			DeLQueue(Q);
		}
	}
	printf("��������ɹ���"); 
}

Status TraverseLQueue(const LQueue *Q, void (*foo)(void *q))
{
	Node *p=Q->front->next;
	if(Q->front==Q->rear)
	{
	printf("����Ϊ�գ����ܹ����������\n");	
	return FALSE;
	}
	else
	{
		printf("���е�Ԫ��ֵ����Ϊ:\n");
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
