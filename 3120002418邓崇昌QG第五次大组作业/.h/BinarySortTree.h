
#ifndef BINARYSORTTREE_BINARY_SORT_TREE_H
#define BINARYSORTTREE_BINARY_SORT_TREE_H
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#define FALSE 0
#define TRUE 1
#define true 1
#define false 0
#define succeed 1
#define failed 0
#define Status int
#define bool int
#define STR_SIZE 100

typedef int ElemType;

typedef struct Node{
    ElemType value;
    struct Node *left, *right;
}Node,*NodePtr;

typedef struct BinarySortTree{
    NodePtr root;
}BinarySortTree, *BinarySortTreePtr;
                                                /*栈*/
typedef  struct StackNode
{
	NodePtr node;
	int flag;                       //后序非递归标志
	struct StackNode *next;
}StackNode, *LinkStackPtr;

typedef  struct  LinkStack
{
	LinkStackPtr top;
	int	count;
}LinkStack;
                                    /*队列*/
typedef struct QNode
{
    NodePtr node;                   //数据域指针
    struct QNode *next;            //指向当前结点的下一结点
}QNode;

typedef struct Lqueue
{
    QNode *front;                   //队头
    QNode *rear;                    //队尾
    size_t length;            //队列长度
} LQueue;

void mainmenuface();
/**
 * BST initialize
 * @param BinarySortTreePtr BST
 * @return is complete
 */
Status BST_init(BinarySortTreePtr);

/**
 * BST insert
 * @param BinarySortTreePtr BST
 * @param ElemType value to insert
 * @return is successful
 */
Status BST_insert(BinarySortTreePtr, ElemType);

/**
 * BST delete
 * @param BinarySortTreePtr BST
 * @param ElemType the value for Node which will be deleted
 * @return is successful
 */
Status BST_delete(BinarySortTreePtr, ElemType);

/**
 * BST search
 * @param BinarySortTreePtr BST
 * @param ElemType the value to search
 * @return is exist
 */
Status BST_search(BinarySortTreePtr, ElemType);

/**
 * BST preorder traversal without recursion
 * @param BinarySortTreePtr BST
 * @param (*visit) callback
 * @return is successful
 */
Status BST_preorderI(BinarySortTreePtr, void (*visit)(NodePtr));

/**
 * BST preorder traversal with recursion
 * @param BinarySortTreePtr BST
 * @param (*visit) callback
 * @return is successful
 */
Status BST_preorderR(BinarySortTreePtr, void (*visit)(NodePtr));

/**
 * BST inorder traversal without recursion
 * @param BinarySortTreePtr BST
 * @param (*visit) callback
 * @return is successful
 */
Status BST_inorderI(BinarySortTreePtr, void (*visit)(NodePtr));

/**
 * BST inorder traversal with recursion
 * @param BinarySortTreePtr BST
 * @param (*visit) callback
 * @return is successful
 */
Status BST_inorderR(BinarySortTreePtr, void (*visit)(NodePtr));

/**
 * BST preorder traversal without recursion
 * @param BinarySortTreePtr BST
 * @param (*visit) callback
 * @return is successful
 */
Status BST_postorderI(BinarySortTreePtr, void (*visit)(NodePtr));

/**
 * BST postorder traversal with recursion
 * @param BinarySortTreePtr BST
 * @param (*visit) callback
 * @return is successful
 */
Status BST_postorderR(BinarySortTreePtr, void (*visit)(NodePtr));

/**
 * BST level order traversal
 * @param BinarySortTreePtr BST
 * @param (*visit) callback
 * @return is successful
 */
Status BST_levelOrder(BinarySortTreePtr, void (*visit)(NodePtr));


Status Delete(NodePtr *p);//删除
Status delete_BST(NodePtr *T,int key);//删除
void print(NodePtr node);//打印数据
Status preorderR_BST(NodePtr node); //前序遍历递归
Status inorderR_BST(NodePtr node); //中序遍历递归
Status postorderR_BST(NodePtr node); //后序遍历递归
NodePtr create_BSTree(void); //创建二叉树
Status SearchBST(NodePtr T,int key,NodePtr f,NodePtr *p);//查找
void draw_level(NodePtr node,bool left,char* str);//水平画树
void draw(NodePtr node);//画树

Status preorderTraverse(NodePtr node);//前序非递归
Status InorderTraverse(NodePtr node);
Status levelOrder_BST(NodePtr node);//层序遍历
Status postorderTraverse(NodePtr node);//后序非递归

                /*栈*/
Status initLStack(LinkStack *s);//初始化栈
Status isEmptyLStack(LinkStack *s);//判断栈是否为空
NodePtr getTopLStack(LinkStack *s);//得到栈顶元素
Status pushLStack(LinkStack *s,NodePtr node);//入栈
Status popLStack(LinkStack *s);//出栈
                /*队列*/
void InitLQueue(LQueue *Q);//初始化队列

Status IsEmptyLQueue(const LQueue *Q);
NodePtr GetHeadLQueue(LQueue *Q);
Status EnLQueue(LQueue *Q,NodePtr node);//入队
NodePtr DeLQueue(LQueue *Q);//出队
#endif //BINARYSORTTREE_BINARY_SORT_TREE_H
