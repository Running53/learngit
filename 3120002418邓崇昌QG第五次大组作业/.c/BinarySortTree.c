#include"BinarySortTree.h"
void mainmenuface(){
	printf("------------------------------------------------\n");
    printf(" 1. 初始化并创建二叉树;    2. 插入结点          \n");
    printf(" 3. 删除结点;              4. 查找结点          \n");
    printf(" 5. 前序遍历(非递归);      6. 前序遍历(递归)    \n");
    printf(" 7. 中序遍历(非递归);      8. 中序遍历(递归)    \n");
    printf(" 9. 后序遍历(非递归);      10. 后序遍历(递归)   \n");
    printf(" 11. 层序遍历;             12. 展示二叉树结构   \n");
    printf("                           0.退出               \n");
    printf("------------------------------------------------\n");
}
Status BST_init(BinarySortTreePtr T)
{
    T->root = NULL;
}

Status BST_insert(BinarySortTreePtr T, ElemType key)
{
    NodePtr p,s;
    if(!SearchBST(T->root,key,NULL,&p))  //查找不成功
    {
        s = (NodePtr)malloc(sizeof(Node));
        s->value = key;
        s->left = s->right = NULL;
        if(!p)
            (T->root) = s;   //插入S为新的根节点
        else if(key<p->value)
            p->left = s;  //插入S为左孩子
        else
            p->right = s;  //插入S为右孩子
        return true;
    }
    else
        return false;   //树中已有关键字相同的结点，不再插入
}

Status BST_delete(BinarySortTreePtr T, ElemType key)
{
    if(!(T->root))
        return false;
    else
    {
        if(key==((T->root))->value)
            return Delete(T->root);
        else if(key<(T->root)->value)
            return BST_delete(&(T->root)->left,key);
        else
            return BST_delete(&(T->root)->right,key);
    }
}
Status Delete(NodePtr *p)
{
    NodePtr q,s;
    if((*p)->right == NULL)
    {
        q=*p;
        *p=(*p)->left;
        free(q);
    }
    else if((*p)->left==NULL)
    {
        q=*p;
        *p=(*p)->right;
        free(q);
    }
    else
    {
        q=*p;
        s=(*p)->left;
        while(s->right)
        {
            q=s;
            s=(*p)->left;
        }
        (*p)->value = s->value;
        if(q!=*p)
            q->right = s->left;
        else q->left = s->left;
        free(s);
    }
    return true;
}
Status delete_BST(NodePtr *T,int key)
{
    if(!*T)
        return false;
    else
    {
        if(key==(*T)->value)
            return Delete(T);
        else if(key<(*T)->value)
            return delete_BST(&(*T)->left,key);
        else
            return delete_BST(&(*T)->right,key);
    }
}

Status BST_search(BinarySortTreePtr T, ElemType key)
{
    if(!(T->root)||T->root->value == key)         //如果pTree为NULL，则查找不成功
	{	//这里包含了树空，即pTree为NULL的情况
		return false;
	}
    else if(key < T->root->value)		//在左子树中递归查找
			return BST_search(T->root->left,key);
		else							//在右子树中递归查找
			return BST_search(T->root->right,key);
}


Status BST_preorderI(BinarySortTreePtr T, void (*visit)(NodePtr node))
{
    LinkStack s;
    initLStack(&s);
    pushLStack(&s,T->root);
    while(!isEmptyLStack(&s))
        {
            NodePtr node = getTopLStack(&s);
            if(node == NULL){
                continue;
            }
            printf("%d ",node->value);
            popLStack(&s);
            if(node->right!=NULL)
            {
                pushLStack(&s,node->right);
            }
            if(node->left!=NULL)
            {
                pushLStack(&s,node->left);
            }
        }
    return;
}

Status BST_preorderR(BinarySortTreePtr T, void (*visit)(NodePtr node))
{
    print(T->root);
    if(T->root->left!=NULL)
        preorderR_BST(T->root->left);
    if(T->root!=NULL)
        preorderR_BST(T->root->right);
}

Status BST_inorderI(BinarySortTreePtr T, void (*visit)(NodePtr node))
{
    LinkStack s;
    initLStack(&s);//初始化栈
    NodePtr p = T->root; //指针p指向根节点
    NodePtr q = (NodePtr)malloc(sizeof(Node)); //申请一个结点空间用来存放栈顶弹出的元素
    q = T->root;
    while(p||!isEmptyLStack(&s))
    {
        if(p)
        {
            pushLStack(&s,p);//根节点入栈
            p = p->left; //遍历左子树
        }
        else{
            q = getTopLStack(&s); //将栈顶元素赋给q
            popLStack(&s); //弹出栈顶元素
            printf("%d ",q->value);
            p = q->right; //遍历右子树
        }
    }
}

Status BST_inorderR(BinarySortTreePtr T, void (*visit)(NodePtr node))
{
    printf("4");
    if(T->root->left!=NULL)
        inorderR_BST(T->root->left);
    print(T->root);
    if(T->root!=NULL)
        inorderR_BST(T->root->right);
}

Status BST_postorderI(BinarySortTreePtr T, void (*visit)(NodePtr node))
{
    LinkStack s;
    initLStack(&s);//初始化栈
    NodePtr p = T->root; //指针p指向根节点
    NodePtr q = (NodePtr)malloc(sizeof(Node)); //申请一个结点空间用来存放栈顶弹出的元素
    q = T->root;
    do{
        while(p!=NULL)
        {
            pushLStack(&s,p);
            s.top->flag = 0;
            p = p->left;
            while(!isEmptyLStack(&s)&&p==NULL)
            {
                p = s.top->node->right;
                s.top->flag = 1;
                if(p!=NULL){
                    pushLStack(&s,p);
                    s.top->flag = 0;
                    p = p->left;
                    }
                while(!isEmptyLStack(&s)&&s.top->flag==1)
                {
                    q = getTopLStack(&s); //将栈顶元素赋给q
                    popLStack(&s); //弹出栈顶元素
                    printf("%d ",q->value);
                }
            }
        }
        printf("%ss = d .",s.top->node->value);
    }while(!isEmptyLStack(&s));
}

Status BST_postorderR(BinarySortTreePtr T, void (*visit)(NodePtr))
{
    if(T->root->left!=NULL)
        postorderR_BST(T->root->left);
    if(T->root!=NULL)
        postorderR_BST(T->root->right);
    print(T->root);
}

void print(NodePtr node)
{
    printf("%d",node->value);
}
Status preorderR_BST(NodePtr node)
{
    if(node==NULL)
        return false;
    printf("%d ",node->value);
    preorderR_BST(node->left);
    preorderR_BST(node->right);
}
Status inorderR_BST(NodePtr node)
{
    if(node==NULL)
        return false;
    inorderR_BST(node->left);
    printf("%d ",node->value);
    inorderR_BST(node->right);
}
Status postorderR_BST(NodePtr node)
{
    if(node==NULL)
        return false;
    postorderR_BST(node->left);
    postorderR_BST(node->right);
    printf("%d ",node->value);
}
NodePtr create_BSTree(void)
{
    int i;
    int a[10] = {62,88,58,47,35,73,52,99,37,93};
    NodePtr node = NULL;
    for(i=0;i<10;i++)
    {
        InserBST(&node,a[i]);
    }
    return node;
}
Status SearchBST(NodePtr T,int key,NodePtr f,NodePtr *p)
{
    if(!T)
    {
        *p = f;
        return false;
    }
    else if(key == T->value)
    {
        *p = T;
        return true;
    }
    else if(key<T->value)
        return SearchBST(T->left,key,T,p);
    else
        return SearchBST(T->right,key,T,p);
}
Status InserBST(NodePtr *T,int key)
{
    NodePtr p,s;
    if(!SearchBST(*T,key,NULL,&p))  //查找不成功
    {
        s = (NodePtr)malloc(sizeof(Node));
        s->value = key;
        s->left = s->right = NULL;
        if(!p)
            *T = s;   //插入S为新的根节点
        else if(key<p->value)
            p->left = s;  //插入S为左孩子
        else
            p->right = s;  //插入S为右孩子
        return true;
    }
    else
        return false;   //树中已有关键字相同的结点，不再插入
}
                        /*水平画树函数*/
void draw_level(NodePtr node,bool left,char* str)// 画分支
{
    if (node->right) {
        draw_level(node->right,false,strcat(str, (left ? "|     " : "      ")));
    }

    printf("%s", str);
    printf("%c", (left ? '\\' : '/'));
    printf("-----");
    printf("%d\n", node->value);

    if (node->left) {
        draw_level(node->left,true,strcat(str, (left ? "      " : "|     ")));
    }
    //  "      " : "|     " 长度为 6
    str[strlen(str) - 6] = '\0';
}
void draw(NodePtr node) //画根结点
{
    char *str[STR_SIZE];
    memset(str, '\0', STR_SIZE);

    if (node->right) {
        draw_level(node->right, false, str);
    }
    printf("%d\n", node->value);
    if (node->left) {
        draw_level(node->left, true, str);
    }
}

Status preorderTraverse(NodePtr node)           //前序非递归
{
    LinkStack s;
    initLStack(&s);
    pushLStack(&s,node);
    while(!isEmptyLStack(&s))
        {
            NodePtr node = getTopLStack(&s);
            if(node == NULL){
                continue;
            }
            printf("%d ",node->value);
            popLStack(&s);
            if(node->right!=NULL)
            {
                pushLStack(&s,node->right);
            }
            if(node->left!=NULL)
            {
                pushLStack(&s,node->left);
            }
        }
    return;
}

Status InorderTraverse(NodePtr node)        //中序非递归
{
    LinkStack s;
    initLStack(&s);//初始化栈
    NodePtr p = node; //指针p指向根节点
    NodePtr q = (NodePtr)malloc(sizeof(node)); //申请一个结点空间用来存放栈顶弹出的元素
    q = node;
    while(p||!isEmptyLStack(&s))
    {
        if(p)
        {
            pushLStack(&s,p);//根节点入栈
            p = p->left; //遍历左子树
        }
        else{
            q = getTopLStack(&s); //将栈顶元素赋给q
            popLStack(&s); //弹出栈顶元素
            printf("%d ",q->value);
            p = q->right; //遍历右子树
        }
    }
}

Status levelOrder_BST(NodePtr node)             //层序遍历
{
    LQueue Q;
    int flag = 0;
    NodePtr q = (NodePtr)malloc(sizeof(node));
//    NodePtr L = node->left,R = node->right;
    if(node == NULL)
        return;
    InitLQueue(&Q);
    EnLQueue(&Q,node);
    while(!IsEmptyLQueue(&Q))
    {
//        q = GetHeadLQueue(&Q);      //得到栈顶元素
        q = DeLQueue(&Q);           //出队
        printf("%d ",q->value);
            if(q->left!=NULL)
            {
                EnLQueue(&Q,q->left);        //入队
            }
            if(q->right!=NULL)
            {
                EnLQueue(&Q,q->right);       //入队

            }
    }
}

Status postorderTraverse(NodePtr node)   //后序非递归
{
    LinkStack s;
    initLStack(&s);//初始化栈
    NodePtr p = node; //指针p指向根节点
    NodePtr q = (NodePtr)malloc(sizeof(node)); //申请一个结点空间用来存放栈顶弹出的元素
    q = node;
    do{
        while(p!=NULL)
        {
            pushLStack(&s,p);
            s.top->flag = 0;
            p = p->left;
            while(!isEmptyLStack(&s)&&p==NULL)
            {
                p = s.top->node->right;
                s.top->flag = 1;
                if(p!=NULL){
                    pushLStack(&s,p);
                    s.top->flag = 0;
                    p = p->left;
                    }
                while(!isEmptyLStack(&s)&&s.top->flag==1)
                {
                    q = getTopLStack(&s); //将栈顶元素赋给q
                    popLStack(&s); //弹出栈顶元素
                    printf("%d ",q->value);
                }
            }
        }
        printf("%ss = d .",s.top->node->value);
    }while(!isEmptyLStack(&s));
}
