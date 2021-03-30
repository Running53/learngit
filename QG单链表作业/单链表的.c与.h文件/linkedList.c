#include "linkedList.h"

LinkedList record=NULL;		//用于插入时记录想要插入结点的地址
LinkedList head=NULL; 
LinkedList q=NULL;			//用来指向要插入的结点 
int judge=1;

void mainmenuface()
{
    printf("您已进入菜单，请选择操作！\n");
    printf("★☆★☆★☆★☆★☆★☆★☆★☆★QG牛逼★☆★☆★☆★☆★☆★☆★☆★☆\n");
    printf("*****************************威哥早日脱单*******************************\n");
    printf("                            链表功能系统                                \n");
    printf("                                                                        \n");
    printf("           1.初始化链表            5.查找中间节点 				        \n");
    printf("                                                                        \n");
    printf("           2.插入节点              6.删除节点 					        \n");
    printf("                                                                        \n");
    printf("           3.输出链表              7.查询节点是否存在                   \n");
    printf("                                                                        \n");
    printf("           4.链表逆序              8.判断链表是否成环                   \n");
    printf("                                                                        \n");
    printf("	   9.销毁链表		  10.奇数偶数节点交换					\n");
} 

Status InitList(LinkedList *L)
{
	   *L=(LinkedList)malloc(sizeof(LNode)); //给头结点分配一块内存空间  
	   if(*L!=NULL)
	   {
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

void DestroyList(LinkedList *L) 
{
	 LinkedList p1;
	 do{
	 	p1=*L;
	 	(*L)=(*L)->next;
	 	free(p1);
	 }while(*L!=NULL);
	 p1=NULL;
	 L=NULL;		//利用一前一后两个指针销毁所有结点 
	 printf("链表已成功销毁！\n"); 
}

Status InsertList(LNode *p,LNode *q) {
	   LinkedList p2;	   
	   if(p->next!=NULL)
	   {
	   	q->next=p->next;		//不是在最后一个结点后面添加结点q 
  	 	p->next=q;
  	 	printf("添加成功！\n");
  	 	return SUCCESS;
	   }
	   else
	   {
	   	p->next=q;
	   	q->next=NULL;
	   	printf("添加成功！\n");
		return SUCCESS;	//若是在最后一个结点添加结点q 
	   }
}

Status DeleteList(LNode *p, ElemType *e) {
	   LinkedList p3;
	   ElemType value;
	   if(p->next==NULL)
	   {
	   	return ERROR;		//p是最后一个结点，后面无节点 
	   }
	   p3=p->next;
	   p->next=p3->next;
	   value=p3->data;		//p不是最后一个结点 
	   e=&value;			//让指针e指向删除节点数据的地址 
	   free(p3);
	   p3=NULL;	   
	   printf("删除成功！\n");
}

void TraverseList(LinkedList L, void (*visit)(ElemType e)) {
	 printf("您所有节点的数据如下：\n");
	 ElemType e; 
	 LinkedList p4;
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


Status SearchList(LinkedList L, ElemType e) {
	   LinkedList p5;
	   judge=1; 
	   int cnt=0;
   	   p5=L;
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
  			printf("这个结点在第%d位！\n",cnt);
		   	return SUCCESS;		//成功找到这个结点 
		} 	   
}

Status ReverseList(LinkedList *L) {
	   LinkedList p6,p7,p8;
	    if((*L)==NULL||(*L)->next==NULL||(*L)->next->next==NULL)
	    {
	    	printf("链表不需要反转\n");
	    	return ERROR;		//此时链表为空或链表只有一个头结点或只有两个节点，不需要反转 
		}		
		p6=(*L)->next;
		p7=p6->next;
		p6->next=NULL;
		do{
			p8=p7->next;
			p7->next=p6;
			p6=p7;
			p7=p8;			//使用三个指针轮流递增实现链表逆序反转 
		}while(p8!=NULL);
		(*L)->next=p6;
		printf("链表反转完成！\n");
		TraverseList(head,print);
		return SUCCESS;
}

Status IsLoopList(LinkedList L) {
	   LinkedList pslow,pquick;
	   pslow=L;
	   pquick=L;
	   while(pquick!=NULL&&pquick->next==NULL)
	   {
	   	pquick=pquick->next->next;//利用快慢指针 
	   	pslow=pslow->next;
	   	if(pslow==pquick)
		{
			printf("链表存在环结构！\n");
		   	return SUCCESS; //两指针指向同一个地址说明链表是有环的 
		} 
	   }
	   printf("链表不存在环结构！\n");
	   return ERROR; //两指针没有相遇说明链表无环 
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
	   	printf("您有偶数个有数据的节点，可以进行本次操作！\n");
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
	   printf("奇偶节点交换完成！\n");
	   TraverseList(head,print); //遍历输出链表
	   return *L; 
	   }
       if(cnt%2!=0) 
	   {
	   	 printf("您有奇数个有数据的节点，不可以进行本次操作！\n");
	   	 return *L;
	   }	   
}

LNode* FindMidNode(LinkedList *L) {
	   
	   LinkedList p1,p2;
	   p1=*L;
	   p2=*L;
	   while(p2!=NULL&&p2->next!=NULL)
	   {
	   	p2=p2->next->next;	//利用快慢指针，当快的指针走到最后一个结点，慢的指针刚好走到中间 
	   	p1=p1->next;
	   }
	   printf("成功返回中间节点,其对应的数据为%d\n",p1->data);
	   
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
	TraverseList(head,print);		//给用户显示一遍页面 
	printf("选择您想在哪一个数据所对应的节点后插入新的节点：\n");
	while(inputCheck(&number))
   	{
    printf("输入有误！请重新输入：\n");
	} 
	SearchList(head, number);		//让record指针指向这个数据所对应的节点 
	}
	else 
	{
		record=head; 
	}	
	if(judge!=0) 
	{
	q=(LinkedList)malloc(sizeof(LNode));
	printf("请输入您插入节点的数据：\n");
	scanf("%d",&q->data);
	InsertList(record,q);
	}		
}

void select2 ()
{
	ElemType number;
	TraverseList(head,print);
	printf("选择您想要删除结点的上一个结点中的数据：\n");
	while(inputCheck(&number))
    {
    	printf("输入有误！请重新输入：\n");
	} 
    SearchList(head, number);
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
