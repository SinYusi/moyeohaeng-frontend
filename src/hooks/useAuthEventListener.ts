import { useEffect } from 'react';
import { eventManager, AUTH_EVENTS } from '../utils/eventManager';
import MemberService from '../service/memberService';

export function useAuthEventListener() {
  useEffect(() => {
    const unsubscribe = eventManager.subscribe(AUTH_EVENTS.LOGIN_SUCCESS, async () => {
      try {
        const memberService = new MemberService();
        await memberService.getMyMembers();
      } catch (error) {
        console.error('멤버 정보 조회 실패:', error);
      }
    });

    return () => unsubscribe();
  }, []);
}
