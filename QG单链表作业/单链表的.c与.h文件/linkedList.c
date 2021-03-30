#include "linkedList.h"

LinkedList record=NULL;		//���ڲ���ʱ��¼��Ҫ������ĵ�ַ
LinkedList head=NULL; 
LinkedList q=NULL;			//����ָ��Ҫ����Ľ�� 
int judge=1;

void mainmenuface()
{
    printf("���ѽ���˵�����ѡ�������\n");
    printf("������������������QGţ�ơ����������������\n");
    printf("*****************************���������ѵ�*******************************\n");
    printf("                            ������ϵͳ                                \n");
    printf("                                                                        \n");
    printf("           1.��ʼ������            5.�����м�ڵ� 				        \n");
    printf("                                                                        \n");
    printf("           2.����ڵ�              6.ɾ���ڵ� 					        \n");
    printf("                                                                        \n");
    printf("           3.�������              7.��ѯ�ڵ��Ƿ����                   \n");
    printf("                                                                        \n");
    printf("           4.��������              8.�ж������Ƿ�ɻ�                   \n");
    printf("                                                                        \n");
    printf("	   9.��������		  10.����ż���ڵ㽻��					\n");
} 

Status InitList(LinkedList *L)
{
	   *L=(LinkedList)malloc(sizeof(LNode)); //��ͷ������һ���ڴ�ռ�  
	   if(*L!=NULL)
	   {
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

void DestroyList(LinkedList *L) 
{
	 LinkedList p1;
	 do{
	 	p1=*L;
	 	(*L)=(*L)->next;
	 	free(p1);
	 }while(*L!=NULL);
	 p1=NULL;
	 L=NULL;		//����һǰһ������ָ���������н�� 
	 printf("�����ѳɹ����٣�\n"); 
}

Status InsertList(LNode *p,LNode *q) {
	   LinkedList p2;	   
	   if(p->next!=NULL)
	   {
	   	q->next=p->next;		//���������һ����������ӽ��q 
  	 	p->next=q;
  	 	printf("��ӳɹ���\n");
  	 	return SUCCESS;
	   }
	   else
	   {
	   	p->next=q;
	   	q->next=NULL;
	   	printf("��ӳɹ���\n");
		return SUCCESS;	//���������һ�������ӽ��q 
	   }
}

Status DeleteList(LNode *p, ElemType *e) {
	   LinkedList p3;
	   ElemType value;
	   if(p->next==NULL)
	   {
	   	return ERROR;		//p�����һ����㣬�����޽ڵ� 
	   }
	   p3=p->next;
	   p->next=p3->next;
	   value=p3->data;		//p�������һ����� 
	   e=&value;			//��ָ��eָ��ɾ���ڵ����ݵĵ�ַ 
	   free(p3);
	   p3=NULL;	   
	   printf("ɾ���ɹ���\n");
}

void TraverseList(LinkedList L, void (*visit)(ElemType e)) {
	 printf("�����нڵ���������£�\n");
	 ElemType e; 
	 LinkedList p4;
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


Status SearchList(LinkedList L, ElemType e) {
	   LinkedList p5;
	   judge=1; 
	   int cnt=0;
   	   p5=L;
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
  			printf("�������ڵ�%dλ��\n",cnt);
		   	return SUCCESS;		//�ɹ��ҵ������� 
		} 	   
}

Status ReverseList(LinkedList *L) {
	   LinkedList p6,p7,p8;
	    if((*L)==NULL||(*L)->next==NULL||(*L)->next->next==NULL)
	    {
	    	printf("������Ҫ��ת\n");
	    	return ERROR;		//��ʱ����Ϊ�ջ�����ֻ��һ��ͷ����ֻ�������ڵ㣬����Ҫ��ת 
		}		
		p6=(*L)->next;
		p7=p6->next;
		p6->next=NULL;
		do{
			p8=p7->next;
			p7->next=p6;
			p6=p7;
			p7=p8;			//ʹ������ָ����������ʵ����������ת 
		}while(p8!=NULL);
		(*L)->next=p6;
		printf("����ת��ɣ�\n");
		TraverseList(head,print);
		return SUCCESS;
}

Status IsLoopList(LinkedList L) {
	   LinkedList pslow,pquick;
	   pslow=L;
	   pquick=L;
	   while(pquick!=NULL&&pquick->next==NULL)
	   {
	   	pquick=pquick->next->next;//���ÿ���ָ�� 
	   	pslow=pslow->next;
	   	if(pslow==pquick)
		{
			printf("������ڻ��ṹ��\n");
		   	return SUCCESS; //��ָ��ָ��ͬһ����ַ˵���������л��� 
		} 
	   }
	   printf("�������ڻ��ṹ��\n");
	   return ERROR; //��ָ��û������˵�������޻� 
}

LNode* ReverseEvenList(LinkedList *L) {
	   LinkedList p1,p2,p3;
	   int cnt=0;
   	   p1=*L;
	   do
	   {
	   	p1=p1->next;
	   	cnt++;
	   } while(p1->next!=NULL);
	   if(cnt%2==0)
	   {
	   	printf("����ż���������ݵĽڵ㣬���Խ��б��β�����\n");
   		p1=(*L)->next;
	    p2=p1->next;
	    (*L)->next=p2;
	    do{
	   	p3=p2->next;
	   	p2->next=p1;	   	
   		if(p3!=NULL)
   		{
   		    p1->next=p3->next;
   			p2=p3->next;
			p1=p3;  
		}
	   }while(p3!=NULL);
	   p1->next=NULL;
	   printf("��ż�ڵ㽻����ɣ�\n");
	   TraverseList(head,print); //�����������
	   return *L; 
	   }
       if(cnt%2!=0) 
	   {
	   	 printf("���������������ݵĽڵ㣬�����Խ��б��β�����\n");
	   	 return *L;
	   }	   
}

LNode* FindMidNode(LinkedList *L) {
	   
	   LinkedList p1,p2;
	   p1=*L;
	   p2=*L;
	   while(p2!=NULL&&p2->next!=NULL)
	   {
	   	p2=p2->next->next;	//���ÿ���ָ�룬�����ָ���ߵ����һ����㣬����ָ��պ��ߵ��м� 
	   	p1=p1->next;
	   }
	   printf("�ɹ������м�ڵ�,���Ӧ������Ϊ%d\n",p1->data);
	   
	   return p1;
}

void print (ElemType e)
{
 printf("%d\n",e); 
}

void select1 ()
{
	if(head->next!=NULL)
	{
	ElemType number;
	TraverseList(head,print);		//���û���ʾһ��ҳ�� 
	printf("ѡ����������һ����������Ӧ�Ľڵ������µĽڵ㣺\n");
	while(inputCheck(&number))
   	{
    printf("�����������������룺\n");
	} 
	SearchList(head, number);		//��recordָ��ָ�������������Ӧ�Ľڵ� 
	}
	else 
	{
		record=head; 
	}	
	if(judge!=0) 
	{
	q=(LinkedList)malloc(sizeof(LNode));
	printf("������������ڵ�����ݣ�\n");
	scanf("%d",&q->data);
	InsertList(record,q);
	}		
}

void select2 ()
{
	ElemType number;
	TraverseList(head,print);
	printf("ѡ������Ҫɾ��������һ������е����ݣ�\n");
	while(inputCheck(&number))
    {
    	printf("�����������������룺\n");
	} 
    SearchList(head, number);
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
