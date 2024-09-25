export const checkUrlSafety = async (url: string): Promise<string> => {
    // FastAPI 서버로 URL을 전송하는 코드를 여기에 추가
    // 현재는 Mock 데이터를 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes('phishing')) {
          resolve('위험!! 다시 확인하세요!');
        } else if (url === '' || url.includes('unknown')) { // 알수없음 상태를 추가하는 조건
          resolve('알수없는 URL 입니다!');
        } else {
          resolve('안전한 URL 입니다!');
        }
      }, 1000);
    });
  };