import useGetLiveMember from "../../../hooks/member/useGetLiveMember";

const UserSection = () => {
  const { liveMember, isLoading, error } = useGetLiveMember();

  //TODO: LiveMember 리스트 출력하기

  if (!isLoading && !error) {
    return (
      <div className="flex items-center gap-2">
        {liveMember.map((member) => (
          <div key={member.id}>{member.name}</div>
        ))}
      </div>
    );
  }
};

export default UserSection;
