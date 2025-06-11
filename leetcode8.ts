class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function isPalindrome(head: ListNode | null): boolean {
  const values: number[] = [];
  let current = head;

  while (current !== null) {
    values.push(current.val);
    current = current.next;
  }

  const reversed: number[] = [...values].reverse();

  for (let i = 0; i < values.length; i++) {
    if (values[i] !== reversed[i]) {
      return false;
    }
  }
  return true;
}

const head = new ListNode(1, new ListNode(2));
const head1 = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(2, new ListNode(1)))));
console.log(isPalindrome(head));
console.log(isPalindrome(head1)); 


