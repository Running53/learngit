#include"BinarySortTree.h"
void mainmenuface(){
	printf("------------------------------------------------\n");
    printf(" 1. ��ʼ��������������;    2. ������          \n");
    printf(" 3. ɾ�����;              4. ���ҽ��          \n");
    printf(" 5. ǰ�����(�ǵݹ�);      6. ǰ�����(�ݹ�)    \n");
    printf(" 7. �������(�ǵݹ�);      8. �������(�ݹ�)    \n");
    printf(" 9. �������(�ǵݹ�);      10. �������(�ݹ�)   \n");
    printf(" 11. �������;             12. չʾ�������ṹ   \n");
    printf("                           0.�˳�               \n");
    printf("------------------------------------------------\n");
}
Status BST_init(BinarySortTreePtr T)
{
    T->root = NULL;
}

Status BST_insert(BinarySortTreePtr T, ElemType key)
{
    NodePtr p,s;
    if(!SearchBST(T->root,key,NULL,&p))  //���Ҳ��ɹ�
    {
        s = (NodePtr)malloc(sizeof(Node));
        s->value = key;
        s->left = s->right = NULL;
        if(!p)
            (T->root) = s;   //����SΪ�µĸ��ڵ�
        else if(key<p->value)
            p->left = s;  //����SΪ����
        else
            p->right = s;  //����SΪ�Һ���
        return true;
    }
    else
        return false;   //�������йؼ�����ͬ�Ľ�㣬���ٲ���
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
    if(!(T->root)||T->root->value == key)         //���pTreeΪNULL������Ҳ��ɹ�
	{	//������������գ���pTreeΪNULL�����
		return false;
	}
    else if(key < T->root->value)		//���������еݹ����
			return BST_search(T->root->left,key);
		else							//���������еݹ����
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
    initLStack(&s);//��ʼ��ջ
    NodePtr p = T->root; //ָ��pָ����ڵ�
    NodePtr q = (NodePtr)malloc(sizeof(Node)); //����һ�����ռ��������ջ��������Ԫ��
    q = T->root;
    while(p||!isEmptyLStack(&s))
    {
        if(p)
        {
            pushLStack(&s,p);//���ڵ���ջ
            p = p->left; //����������
        }
        else{
            q = getTopLStack(&s); //��ջ��Ԫ�ظ���q
            popLStack(&s); //����ջ��Ԫ��
            printf("%d ",q->value);
            p = q->right; //����������
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
    initLStack(&s);//��ʼ��ջ
    NodePtr p = T->root; //ָ��pָ����ڵ�
    NodePtr q = (NodePtr)malloc(sizeof(Node)); //����һ�����ռ��������ջ��������Ԫ��
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
                    q = getTopLStack(&s); //��ջ��Ԫ�ظ���q
                    popLStack(&s); //����ջ��Ԫ��
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
    if(!SearchBST(*T,key,NULL,&p))  //���Ҳ��ɹ�
    {
        s = (NodePtr)malloc(sizeof(Node));
        s->value = key;
        s->left = s->right = NULL;
        if(!p)
            *T = s;   //����SΪ�µĸ��ڵ�
        else if(key<p->value)
            p->left = s;  //����SΪ����
        else
            p->right = s;  //����SΪ�Һ���
        return true;
    }
    else
        return false;   //�������йؼ�����ͬ�Ľ�㣬���ٲ���
}
                        /*ˮƽ��������*/
void draw_level(NodePtr node,bool left,char* str)// ����֧
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
    //  "      " : "|     " ����Ϊ 6
    str[strlen(str) - 6] = '\0';
}
void draw(NodePtr node) //�������
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

Status preorderTraverse(NodePtr node)           //ǰ��ǵݹ�
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

Status InorderTraverse(NodePtr node)        //����ǵݹ�
{
    LinkStack s;
    initLStack(&s);//��ʼ��ջ
    NodePtr p = node; //ָ��pָ����ڵ�
    NodePtr q = (NodePtr)malloc(sizeof(node)); //����һ�����ռ��������ջ��������Ԫ��
    q = node;
    while(p||!isEmptyLStack(&s))
    {
        if(p)
        {
            pushLStack(&s,p);//���ڵ���ջ
            p = p->left; //����������
        }
        else{
            q = getTopLStack(&s); //��ջ��Ԫ�ظ���q
            popLStack(&s); //����ջ��Ԫ��
            printf("%d ",q->value);
            p = q->right; //����������
        }
    }
}

Status levelOrder_BST(NodePtr node)             //�������
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
//        q = GetHeadLQueue(&Q);      //�õ�ջ��Ԫ��
        q = DeLQueue(&Q);           //����
        printf("%d ",q->value);
            if(q->left!=NULL)
            {
                EnLQueue(&Q,q->left);        //���
            }
            if(q->right!=NULL)
            {
                EnLQueue(&Q,q->right);       //���

            }
    }
}

Status postorderTraverse(NodePtr node)   //����ǵݹ�
{
    LinkStack s;
    initLStack(&s);//��ʼ��ջ
    NodePtr p = node; //ָ��pָ����ڵ�
    NodePtr q = (NodePtr)malloc(sizeof(node)); //����һ�����ռ��������ջ��������Ԫ��
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
                    q = getTopLStack(&s); //��ջ��Ԫ�ظ���q
                    popLStack(&s); //����ջ��Ԫ��
                    printf("%d ",q->value);
                }
            }
        }
        printf("%ss = d .",s.top->node->value);
    }while(!isEmptyLStack(&s));
}
