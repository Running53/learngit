#include "AQueue.h" 
int flag=0;
int j=0;
void mainmenuface()
{
	printf("----------------------------------------\n");
	printf("----------1.��ʼ������------------------\n");
	printf("----------2.���ٶ���--------------------\n");
	printf("----------3.�������Ƿ�����------------\n");
	printf("----------4.�������Ƿ�Ϊ��------------\n");
	printf("----------5.�鿴��ͷԪ��----------------\n");
	printf("----------6.ȷ�����г���----------------\n");
	printf("----------7.���------------------------\n");
	printf("----------8.����------------------------\n");
	printf("----------9.��ն���--------------------\n");
	printf("----------10.�����������Ԫ��-----------\n");
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
	flag=1;			//falg���ڱ�Ƕ����Ѿ���ʼ�� 
	Q->front=0;
	Q->rear=0;		//��ʼ��ͷβָ�� 
	Q->length=MAXQUEUE-1;
	for(i=0;i<MAXQUEUE;i++)
	{
		Q->data[i]=(void *)malloc(20);//�û�Ҫ������ݴ�С���ǲ�֪��������һ���Ƚϴ�Ŀռ� 
	}
	printf("���г�ʼ���ɹ���\n");
}

void DestoryAQueue(AQueue *Q) //���ٶ��� 
{
	int i=0;
	flag=0;
	for(i=0;i<MAXQUEUE;i++)
	{
		free(Q->data[i]);	//�ͷŵ��洢���ݵ��ڴ棬����ֹҰָ������� 
		Q->data[i]==NULL;
	}
	printf("�������ٳɹ���\n");
}

Status IsFullAQueue(const AQueue *Q)
{
	if((Q->rear+1)%MAXQUEUE==Q->front)
	printf("����������\n");
	else if(Q->front==Q->rear)
	{
 	    printf("����δ����Ϊ�գ�\n");
		return FALSE;
	}
	else
	printf("����δ���Ҳ�Ϊ�գ�\n");
	TraverseAQueue(Q,APrint);	//�����������Ԫ�� 	
	return TRUE;
}
  
Status IsEmptyAQueue(const AQueue *Q)
{
	if(Q->front==Q->rear)
	{
 	    printf("����Ϊ�գ�\n");
		return TRUE;
	}	
	else
	printf("���в�Ϊ�գ�\n");
	TraverseAQueue(Q,APrint);	//�����������Ԫ�� 
	return FALSE;
}

Status GetHeadAQueue(AQueue *Q, void *e)
{
	if(Q->front==Q->rear)
	{
 	    printf("����Ϊ�գ�û�ж�ͷԪ�أ�\n");
		return FALSE;
	}
	else
	{
	j=0;
	memcpy(e,Q->data[Q->front],20);//����ͷԪ�ص�ַ���ֽڿ�����ȥ 
	printf("��ͷԪ��Ϊ:\n");
	APrint(Q->data[Q->front]);//�����ӡ��ͷԪ��
	printf("\n");
	return TRUE; 
	}	
}

int LengthAQueue(AQueue *Q)
{
	printf("���г���Ϊ%d\n",(Q->rear-Q->front+MAXQUEUE)%MAXQUEUE);
	return (Q->rear-Q->front+MAXQUEUE)%MAXQUEUE;//������г��� 
}

Status EnAQueue(AQueue *Q, void *data)
{
	memcpy(Q->data[Q->rear],data,20);//��Ԫ�ص�����ֵ������������ 
	Q->rear=(Q->rear+1)%MAXQUEUE; //�ö���β��ָ��ָ����һ��λ�� 
	printf("���гɹ���\n");
//	APrint(Q->data[Q->front]);
	TraverseAQueue(Q,APrint);
	return TRUE;
}	

Status DeAQueue(AQueue *Q)
{
	if(Q->front==Q->rear)//����Ϊ�գ����ɳ��� 
	{
		printf("����Ϊ�գ����ɳ���!\n");
		return FALSE;
	}
	
	printf("���гɹ�������Ԫ��Ϊ��\n");
	j=Q->front;
	APrint(Q->data[Q->front]);
	printf("\n");
	Q->front=(Q->front+1)%MAXQUEUE;//��ͷָ��ָ����һ��λ�� 
	return TRUE;
}

void ClearAQueue(AQueue *Q)
{
	while(Q->front!=Q->rear)
	{
		DeAQueue(Q);//���в��� 
	}
	printf("������ճɹ���\n");
}

void APrint(void *q)//��ӡ���� 
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
		printf("����Ϊ�գ������Ա�����\n");
		return FALSE;
	}
	else 
	{
		printf("����Ԫ������Ϊ��");
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
	if((Q->rear+1)%MAXQUEUE==Q->front)//˵�������Ѿ����ˣ��������� 
		{
			printf("�����������������У�\n");
			return FALSE;
		}
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
			j=Q->rear;
			datatype[Q->rear]='4';
			EnAQueue(Q,g);
			break;
	}
	return TRUE;
}

