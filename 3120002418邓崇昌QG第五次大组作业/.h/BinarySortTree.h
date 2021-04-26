
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
                                                /*ջ*/
typedef  struct StackNode
{
	NodePtr node;
	int flag;                       //����ǵݹ��־
	struct StackNode *next;
}StackNode, *LinkStackPtr;

typedef  struct  LinkStack
{
	LinkStackPtr top;
	int	count;
}LinkStack;
                                    /*����*/
typedef struct QNode
{
    NodePtr node;                   //������ָ��
    struct QNode *next;            //ָ��ǰ������һ���
}QNode;

typedef struct Lqueue
{
    QNode *front;                   //��ͷ
    QNode *rear;                    //��β
    size_t length;            //���г���
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


Status Delete(NodePtr *p);//ɾ��
Status delete_BST(NodePtr *T,int key);//ɾ��
void print(NodePtr node);//��ӡ����
Status preorderR_BST(NodePtr node); //ǰ������ݹ�
Status inorderR_BST(NodePtr node); //��������ݹ�
Status postorderR_BST(NodePtr node); //��������ݹ�
NodePtr create_BSTree(void); //����������
Status SearchBST(NodePtr T,int key,NodePtr f,NodePtr *p);//����
void draw_level(NodePtr node,bool left,char* str);//ˮƽ����
void draw(NodePtr node);//����

Status preorderTraverse(NodePtr node);//ǰ��ǵݹ�
Status InorderTraverse(NodePtr node);
Status levelOrder_BST(NodePtr node);//�������
Status postorderTraverse(NodePtr node);//����ǵݹ�

                /*ջ*/
Status initLStack(LinkStack *s);//��ʼ��ջ
Status isEmptyLStack(LinkStack *s);//�ж�ջ�Ƿ�Ϊ��
NodePtr getTopLStack(LinkStack *s);//�õ�ջ��Ԫ��
Status pushLStack(LinkStack *s,NodePtr node);//��ջ
Status popLStack(LinkStack *s);//��ջ
                /*����*/
void InitLQueue(LQueue *Q);//��ʼ������

Status IsEmptyLQueue(const LQueue *Q);
NodePtr GetHeadLQueue(LQueue *Q);
Status EnLQueue(LQueue *Q,NodePtr node);//���
NodePtr DeLQueue(LQueue *Q);//����
#endif //BINARYSORTTREE_BINARY_SORT_TREE_H
