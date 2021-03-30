#include "duLinkedList.h"
DuLinkedList head=NULL;
DuLinkedList record=NULL;		//用于插入时记录想要插入结点的地址
DuLinkedList q=NULL;			//用来指向要插入的结点 
int i=0;
int judge=1;
void mainmenuface()
{
    printf("您已进入菜单，请选择操作！\n");
    printf("★☆★☆★☆☆★QG牛逼★☆★☆★☆\n");
    printf("*************威哥早日脱单**********\n");
    printf("            链表功能系统       	   \n");
    printf("       	 	 1.初始化链表          \n");
    printf("          	 2.销毁链表      		\n");
    printf("        	 3.往前插入节点         \n");
    printf("         	 4.往后插入节点         \n");
    printf("       		 5.删除指定节点     	\n");
    printf("        	 6.输出所有节点数据      \n");
} 

void print(ElemType e)
{
 printf("%d\n",e); 
}

Status InitList_DuL(DuLinkedList *L) {
	   *L=(DuLinkedList)malloc(sizeof(DuLNode)); //给头结点分配一块内存空间  
	   if(*L!=NULL)
	   {
	   	(*L)->prior=NULL;
	   	(*L)->next=NULL; 
	   	printf("初始化成功！\n");//判断头指针有无指向NULL,以判断分配内存是否成功
		return SUCCESS;
	   }
	   else 
	   {
	   	printf("初始化失败！\n");
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
	 L=NULL;		//利用一前一后两个指针销毁所有结点 
	 printf("链表已成功销毁！\n"); 
}

Status InsertBeforeList_DuL(DuLNode *p, DuLNode *q) {
	   DuLinkedList p1;
	   p1=head;
	   while(p1->next!=p)
	   {
	   	p1=p1->next;		//先找到标记节点的前一个节点 
	   }
	   p1->next=q;
	   p->prior=q;			 
	   q->next=p;			//将插入节点的前后两个节点连接起来 
	   q->prior=p1;
	   printf("成功插入节点！\n"); 
	   return SUCCESS;
}
 
void select()
{
	if(head->next!=NULL)
	{
	ElemType number;
	TraverseList_DuL(head,print);		//给用户显示一遍页面 
	if(i==1)
	printf("选择您想在哪一个数据所对应的节点前插入新的节点：\n");
	else if(i==2)
	printf("选择您想在哪一个数据所对应的节点后插入新的节点：\n");
	while(inputCheck(&number))
    {
    	printf("输入有误！请重新输入：\n");
	}
	SearchList(head, number);		//让record指针指向这个数据所对应的节点 
	}
	if(i==2&&head->next==NULL) 
	{
		record=head; 
	}	
	if(judge==1)
	{
	q=(DuLinkedList)malloc(sizeof(DuLNode));
	printf("请输入您插入节点的数据：\n");
	scanf("%d",&(q->data));	
	} 
}
 
Status InsertAfterList_DuL(DuLNode *p, DuLNode *q) 
{
 	   DuLinkedList p3;	   
	   if(p->next!=NULL)
	   {
	   	p3=p->next;				
	   	q->next=p3;		//不是在最后一个结点后面添加结点q 
	   	p3->prior=q;			//新节点要插入在p指针指的节点后，p3指针指的节点前 
  	 	p->next=q;				//让插入的节点和前后两个节点连接 
  	 	q->prior=p;
	 	printf("成功插入节点！\n");
  	 	return SUCCESS;
	   }
	   else
	   {						//若是在最后一个结点添加结点q 
	   	p->next=q;
	   	q->prior=p;
	   	q->next=NULL;
	   	p->next=q;
	   	printf("添加成功！\n");
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
   	   	p5=p5->next;		//利用p5遍历链表寻找这个结点 
   	   	cnt++;
    	}
    	if(p5==NULL)
    	{
    		printf("这个结点不存在！\n");
    		judge=0;
    		return ERROR;		//没有找到这个结点 
		}
	   	else
  		{
  			record=p5;
  			printf("这个结点在第%d位！\n",cnt+1);
		   	return SUCCESS;		//成功找到这个结点 
		} 	   
}

void selectdelete()
{
	ElemType number;
	TraverseList_DuL(head,print);
	printf("选择您想要删除结点的上一个结点中的数据：\n");
	while(inputCheck(&number))
    {
    	printf("输入有误！请重新输入：\n");
	}
    SearchList(head, number);
}

Status DeleteList_DuL(DuLNode *p, ElemType *e) {
	   DuLinkedList p3,p4;
	   ElemType value;
	   if(p->next==NULL)
	   {
	   	return ERROR;		//p是最后一个结点，后面无节点 
	   }
	   if(p->next->next==NULL)		 
	   {
       	p3=p->next;			 
       	p->next=NULL;		//删除的是最后一个节点
       	free(p3);
       	p3=NULL;
       	printf("删除成功！\n");
	   }
	   p3=p->next;
	   p4=p3->next;
	   p->next=p4;			//让被删除节点两端的指针域连接起来 
	   p4->prior=p;
	   value=p3->data;		//需要删除的不是最后一个节点 
	   e=&value;			//让指针e指向删除节点数据的地址 
	   free(p3);
	   p3=NULL;	
   	   printf("删除成功！\n");  
	   return SUCCESS; 
}

void TraverseList_DuL(DuLinkedList L, void (*visit)(ElemType e)) {
	printf("下面是所有结点的数据：\n"); 
	 ElemType e; 
	 DuLinkedList p4;
	 p4=L;
	 if(p4->next!=NULL)
	 {
	 	do{	 
	 	p4=p4->next;	//使用p4遍历链表 
	 	e=p4->data;
		(*visit)(e);    //依次打印出每一个数据 
	 }while(p4->next!=NULL);
	 }	 
}

int inputCheck(int *val)  //检查输入
 {
	char n[50] = {0};
	int i=0,flag =0,j=0;
	// 用户开始输入
	scanf("%s", n);
	for(j=0;n[j]!='\0';j++)
	{
		if(n[j]<'0'||n[j]>'9')
			flag=1;
	}
	if(flag==1)
	{
		// flag==1 则说明用户的输入发生了错误
		return 1;
	}
	*val=atoi(n);
	return 0;
 }
