export const checkUrlSafety = async (url: string): Promise<string> => {
    // FastAPI 서버로 URL을 전송하는 코드를 여기에 추가
    // 현재는 Mock 데이터를 반환
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url.includes('phishing')) {
          resolve('Malicious URL');
        } else {
          resolve('Safe URL');
        }
      }, 1000);
    });
  };