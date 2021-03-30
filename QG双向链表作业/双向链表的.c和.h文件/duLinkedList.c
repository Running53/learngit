#include "duLinkedList.h"
DuLinkedList head=NULL;
DuLinkedList record=NULL;		//���ڲ���ʱ��¼��Ҫ������ĵ�ַ
DuLinkedList q=NULL;			//����ָ��Ҫ����Ľ�� 
int i=0;
int judge=1;
void mainmenuface()
{
    printf("���ѽ���˵�����ѡ�������\n");
    printf("���������QGţ�ơ������\n");
    printf("*************���������ѵ�**********\n");
    printf("            ������ϵͳ       	   \n");
    printf("       	 	 1.��ʼ������          \n");
    printf("          	 2.��������      		\n");
    printf("        	 3.��ǰ����ڵ�         \n");
    printf("         	 4.�������ڵ�         \n");
    printf("       		 5.ɾ��ָ���ڵ�     	\n");
    printf("        	 6.������нڵ�����      \n");
} 

void print(ElemType e)
{
 printf("%d\n",e); 
}

Status InitList_DuL(DuLinkedList *L) {
	   *L=(DuLinkedList)malloc(sizeof(DuLNode)); //��ͷ������һ���ڴ�ռ�  
	   if(*L!=NULL)
	   {
	   	(*L)->prior=NULL;
	   	(*L)->next=NULL; 
	   	printf("��ʼ���ɹ���\n");//�ж�ͷָ������ָ��NULL,���жϷ����ڴ��Ƿ�ɹ�
		return SUCCESS;
	   }
	   else 
	   {
	   	printf("��ʼ��ʧ�ܣ�\n");
	   	return ERROR; 
	   }
}

void DestroyList_DuL(DuLinkedList *L) {
	  DuLinkedList p1;
	  do{
	 	p1=*L;
	 	(*L)=(*L)->next;
	 	free(p1);
	 }while(*L!=NULL);
	 p1=NULL;
	 L=NULL;		//����һǰһ������ָ���������н�� 
	 printf("�����ѳɹ����٣�\n"); 
}

Status InsertBeforeList_DuL(DuLNode *p, DuLNode *q) {
	   DuLinkedList p1;
	   p1=head;
	   while(p1->next!=p)
	   {
	   	p1=p1->next;		//���ҵ���ǽڵ��ǰһ���ڵ� 
	   }
	   p1->next=q;
	   p->prior=q;			 
	   q->next=p;			//������ڵ��ǰ�������ڵ��������� 
	   q->prior=p1;
	   printf("�ɹ�����ڵ㣡\n"); 
	   return SUCCESS;
}
 
void select()
{
	if(head->next!=NULL)
	{
	ElemType number;
	TraverseList_DuL(head,print);		//���û���ʾһ��ҳ�� 
	if(i==1)
	printf("ѡ����������һ����������Ӧ�Ľڵ�ǰ�����µĽڵ㣺\n");
	else if(i==2)
	printf("ѡ����������һ����������Ӧ�Ľڵ������µĽڵ㣺\n");
	while(inputCheck(&number))
    {
    	printf("�����������������룺\n");
	}
	SearchList(head, number);		//��recordָ��ָ�������������Ӧ�Ľڵ� 
	}
	if(i==2&&head->next==NULL) 
	{
		record=head; 
	}	
	if(judge==1)
	{
	q=(DuLinkedList)malloc(sizeof(DuLNode));
	printf("������������ڵ�����ݣ�\n");
	scanf("%d",&(q->data));	
	} 
}
 
Status InsertAfterList_DuL(DuLNode *p, DuLNode *q) 
{
 	   DuLinkedList p3;	   
	   if(p->next!=NULL)
	   {
	   	p3=p->next;				
	   	q->next=p3;		//���������һ����������ӽ��q 
	   	p3->prior=q;			//�½ڵ�Ҫ������pָ��ָ�Ľڵ��p3ָ��ָ�Ľڵ�ǰ 
  	 	p->next=q;				//�ò���Ľڵ��ǰ�������ڵ����� 
  	 	q->prior=p;
	 	printf("�ɹ�����ڵ㣡\n");
  	 	return SUCCESS;
	   }
	   else
	   {						//���������һ�������ӽ��q 
	   	p->next=q;
	   	q->prior=p;
	   	q->next=NULL;
	   	p->next=q;
	   	printf("��ӳɹ���\n");
		return SUCCESS;				
	   }
}

Status SearchList(DuLinkedList L, ElemType e)
{
	   DuLinkedList p5;
	   int cnt=0;
	   judge=1;
   	   p5=L->next;
   	   while(p5!=NULL&&p5->data!=e)
   	   {
   	   	p5=p5->next;		//����p5��������Ѱ�������� 
   	   	cnt++;
    	}
    	if(p5==NULL)
    	{
    		printf("�����㲻���ڣ�\n");
    		judge=0;
    		return ERROR;		//û���ҵ������� 
		}
	   	else
  		{
  			record=p5;
  			printf("�������ڵ�%dλ��\n",cnt+1);
		   	return SUCCESS;		//�ɹ��ҵ������� 
		} 	   
}

void selectdelete()
{
	ElemType number;
	TraverseList_DuL(head,print);
	printf("ѡ������Ҫɾ��������һ������е����ݣ�\n");
	while(inputCheck(&number))
    {
    	printf("�����������������룺\n");
	}
    SearchList(head, number);
}

Status DeleteList_DuL(DuLNode *p, ElemType *e) {
	   DuLinkedList p3,p4;
	   ElemType value;
	   if(p->next==NULL)
	   {
	   	return ERROR;		//p�����һ����㣬�����޽ڵ� 
	   }
	   if(p->next->next==NULL)		 
	   {
       	p3=p->next;			 
       	p->next=NULL;		//ɾ���������һ���ڵ�
       	free(p3);
       	p3=NULL;
       	printf("ɾ���ɹ���\n");
	   }
	   p3=p->next;
	   p4=p3->next;
	   p->next=p4;			//�ñ�ɾ���ڵ����˵�ָ������������ 
	   p4->prior=p;
	   value=p3->data;		//��Ҫɾ���Ĳ������һ���ڵ� 
	   e=&value;			//��ָ��eָ��ɾ���ڵ����ݵĵ�ַ 
	   free(p3);
	   p3=NULL;	
   	   printf("ɾ���ɹ���\n");  
	   return SUCCESS; 
}

void TraverseList_DuL(DuLinkedList L, void (*visit)(ElemType e)) {
	printf("���������н������ݣ�\n"); 
	 ElemType e; 
	 DuLinkedList p4;
	 p4=L;
	 if(p4->next!=NULL)
	 {
	 	do{	 
	 	p4=p4->next;	//ʹ��p4�������� 
	 	e=p4->data;
		(*visit)(e);    //���δ�ӡ��ÿһ������ 
	 }while(p4->next!=NULL);
	 }	 
}

int inputCheck(int *val)  //�������
 {
	char n[50] = {0};
	int i=0,flag =0,j=0;
	// �û���ʼ����
	scanf("%s", n);
	for(j=0;n[j]!='\0';j++)
	{
		if(n[j]<'0'||n[j]>'9')
			flag=1;
	}
	if(flag==1)
	{
		// flag==1 ��˵���û������뷢���˴���
		return 1;
	}
	*val=atoi(n);
	return 0;
 }
