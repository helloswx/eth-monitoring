package main

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	url := "https://rinkeby.infura.io/v3/8b7f48790d10405ea93d990399c42d71"
	
	var post = `{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",true], "id":1}`

	var jsonStr = []byte(post)
	fmt.Println("jsonStr", jsonStr)
	fmt.Println("new_str", bytes.NewBuffer(jsonStr))

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
	// req.Header.Set("X-Custom-Header", "myvalue")
	req.Header.Set("Content-Type", "application/json")

	transport := &http.Transport{
		TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
	}

	client := &http.Client{Transport: transport}
	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("status", resp.Status)
	fmt.Println("response:", resp.Header)
	body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))

	f1, err1 := OpenFile("./output1.json")
	if err1 != nil {
		log.Fatal(err1.Error())
	}
	defer f1.Close()
	n, err1 := io.WriteString(f1, string(body)) //写入文件(字符串)
	if err1 != nil {
		log.Fatal(err1.Error())
	}
	fmt.Printf("写入 %d 个字节\n", n)

}

// OpenFile 判断文件是否存在  存在则OpenFile 不存在则Create
func OpenFile(filename string) (*os.File, error) {
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		fmt.Println("文件不存在")
		return os.Create(filename) //创建文件
	}
	fmt.Println("文件存在")
	return os.OpenFile(filename, os.O_APPEND, 0666) //打开文件
}
