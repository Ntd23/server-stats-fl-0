# Project URL: https://roadmap.sh/projects/log-archive-tool
# Log Archive Tool — DevOps Bash Practice

## Mục tiêu bài tập

Viết một Bash script có thể:

- Nhận thư mục log từ command line
- Kiểm tra input hợp lệ
- Tạo file `.tar.gz`
- Đặt tên file theo thời gian
- Lưu archive vào thư mục riêng
- Ghi lịch sử archive vào file log

# 1. Tạo project

```bash
mkdir log-archive-tool
cd log-archive-tool

touch log-archive.sh
chmod +x log-archive.sh
nano log-archive.sh
```

Dòng đầu file:

```bash
#!/bin/bash
```

---

# 2. Nhận argument từ command line

Script được chạy như sau:

```bash
./log-archive.sh /var/log
```

Trong Bash:

```text
$0 = tên script
$1 = argument thứ nhất
$2 = argument thứ hai
$3 = argument thứ ba
```

Ví dụ:

```bash
#!/bin/bash

LOG_DIR="$1"

echo "Log directory: $LOG_DIR"
```

Chạy:

```bash
./log-archive.sh /var/log
```

Kết quả:

```text
Log directory: /var/log
```

## Cần nhớ

```bash
$1
```

là argument đầu tiên truyền vào script.

---

# 3. Kiểm tra user có truyền argument không

Nếu chạy:

```bash
./log-archive.sh
```

thì `$1` sẽ rỗng.

Kiểm tra:

```bash
if [[ -z "$LOG_DIR" ]]; then
    echo "Usage: $0 <log-directory>"
    exit 1
fi
```

Ý nghĩa:

```text
-z       chuỗi rỗng
exit 1   kết thúc chương trình với trạng thái lỗi
```

---

# 4. Kiểm tra directory có tồn tại không

```bash
if [[ ! -d "$LOG_DIR" ]]; then
    echo "Directory does not exist: $LOG_DIR"
    exit 1
fi
```

Ý nghĩa:

```text
-d   kiểm tra directory
!    NOT
```

Nên:

```bash
[[ ! -d "$LOG_DIR" ]]
```

có nghĩa:

> Directory không tồn tại.

---

# 5. Tạo timestamp

Dùng:

```bash
date +"%Y%m%d_%H%M%S"
```

Ví dụ:

```text
20260906_121530
```

Các ký hiệu:

```text
%Y = năm
%m = tháng
%d = ngày

%H = giờ
%M = phút
%S = giây
```

Gán output command vào variable:

```bash
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
```

## Cần nhớ

```bash
$(command)
```

= chạy command và lấy output của command.

---

# 6. Tạo thư mục lưu archive

```bash
ARCHIVE_DIR="./archives"

mkdir -p "$ARCHIVE_DIR"
```

Ý nghĩa:

```text
mkdir     tạo directory
-p        nếu directory đã tồn tại thì không báo lỗi
```

---

# 7. Tạo tên file archive

```bash
ARCHIVE_FILE="$ARCHIVE_DIR/logs_archive_${TIMESTAMP}.tar.gz"
```

Ví dụ:

```text
./archives/logs_archive_20260906_121530.tar.gz
```

---

# 8. Nén logs bằng tar

Command:

```bash
tar -czf "$ARCHIVE_FILE" -C "$LOG_DIR" .
```

Ý nghĩa:

```text
tar   đóng gói file/directory

-c    create archive
-z    gzip compression
-f    filename
-C    chuyển vào directory trước khi archive
.     toàn bộ nội dung trong directory hiện tại
```

Ví dụ:

```bash
tar -czf backup.tar.gz -C /var/log .
```

Nghĩa là:

> Chuyển vào `/var/log` rồi nén toàn bộ nội dung vào `backup.tar.gz`.

---

# 9. Kiểm tra archive

Xem file:

```bash
ls -lh archives/
```

Xem nội dung bên trong mà không cần giải nén:

```bash
tar -tzf archives/logs_archive_xxx.tar.gz | head
```

Giải nén:

```bash
tar -xzf archives/logs_archive_xxx.tar.gz
```

Cần nhớ:

```text
-c = create
-x = extract
-t = list
-z = gzip
-f = file
```

---

# 10. Ghi lịch sử archive

```bash
echo "$(date) - Archived $LOG_DIR -> $ARCHIVE_FILE" >> archive.log
```

Khác nhau:

```text
>   ghi đè file
>>  ghi thêm vào cuối file
```

Ví dụ `archive.log`:

```text
Sat Sep 6 12:30:10 +07 2026 - Archived /var/log -> ./archives/logs_archive_20260906_123010.tar.gz
Sat Sep 6 13:05:20 +07 2026 - Archived /var/log -> ./archives/logs_archive_20260906_130520.tar.gz
```

---

# 11. Kiểm tra tar có thành công không

Có thể dùng:

```bash
if tar -czf "$ARCHIVE_FILE" -C "$LOG_DIR" .; then
    echo "Archive successful"
else
    echo "Archive failed"
    exit 1
fi
```

Trong Linux:

```text
exit code 0       = success
exit code khác 0  = error
```

Có thể xem exit code command vừa chạy bằng:

```bash
echo $?
```

---

# 12. Bản script cơ bản

```bash
#!/bin/bash

LOG_DIR="$1"

if [[ -z "$LOG_DIR" ]]; then
    echo "Usage: $0 <log-directory>"
    exit 1
fi

if [[ ! -d "$LOG_DIR" ]]; then
    echo "Directory does not exist: $LOG_DIR"
    exit 1
fi

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

ARCHIVE_DIR="./archives"
ARCHIVE_FILE="$ARCHIVE_DIR/logs_archive_${TIMESTAMP}.tar.gz"

mkdir -p "$ARCHIVE_DIR"

if tar -czf "$ARCHIVE_FILE" -C "$LOG_DIR" .; then
    echo "Logs archived successfully:"
    echo "$ARCHIVE_FILE"

    echo "$(date) - Archived $LOG_DIR -> $ARCHIVE_FILE" >> archive.log
else
    echo "Error while archiving logs."
    exit 1
fi
```

Chạy:

```bash
./log-archive.sh /var/log
```

---

# 13. Checkpoint bài tập

## Checkpoint 1

Chạy:

```bash
./log-archive.sh /var/log
```

Script đọc được:

```text
/var/log
```

---

## Checkpoint 2

Không truyền argument:

```bash
./log-archive.sh
```

Phải báo lỗi.

---

## Checkpoint 3

Directory không tồn tại:

```bash
./log-archive.sh /abcxyz
```

Phải báo lỗi.

---

## Checkpoint 4

Tạo được:

```text
archives/
```

---

## Checkpoint 5

Tạo được file:

```text
logs_archive_YYYYMMDD_HHMMSS.tar.gz
```

---

## Checkpoint 6

Có file:

```text
archive.log
```

ghi lịch sử archive.

---

# 14. Sau khi bản cơ bản chạy ổn

Nâng cấp theo thứ tự:

```text
Version 1
$1
→ tar
→ archive.log

Version 2
getopts
→ -l
→ -a

Version 3
-d
→ xóa log gốc

Version 4
-t
→ cron

Version 5
-s
→ AWS S3
```

---

# 15. getopts

Sau này thay vì:

```bash
./log-archive.sh /var/log
```

có thể dùng:

```bash
log-archive -l /var/log -a /backup
```

Ví dụ:

```bash
while getopts 'l:a:s:dt' OPTION; do
    case "$OPTION" in
        l)
            dir="$OPTARG"
            ;;
        a)
            archiveDir="$OPTARG"
            ;;
        s)
            s3="$OPTARG"
            ;;
        d)
            deleteLogs=true
            ;;
        t)
            schedule=true
            ;;
    esac
done
```

Ý nghĩa:

```text
l:   -l cần value
a:   -a cần value
s:   -s cần value

d    chỉ là flag
t    chỉ là flag
```

`OPTARG` là value của option hiện tại.

Ví dụ:

```bash
-l /var/log
```

thì:

```text
OPTARG=/var/log
```

---

# 16. Cron

Cron:

```text
0 0 * * *
```

nghĩa là:

> chạy lúc 00:00 mỗi ngày.

Cấu trúc:

```text
minute hour day month weekday
```

Ví dụ:

```bash
0 0 * * * /usr/local/bin/log-archive -l /var/log -a /backup
```

---

# 17. AWS S3

Upload:

```bash
aws s3 cp "$ARCHIVE_FILE" s3://my-bucket
```

Cần:

- AWS CLI
- AWS credentials hoặc IAM Role
- Permission upload vào bucket

---

# 18. Xóa log

Ví dụ:

```bash
rm -rf "$LOG_DIR"/*
```

## Cảnh báo

`rm -rf` rất nguy hiểm.

Phải chắc chắn variable đúng trước khi chạy.

Không copy command kiểu này từ AI nếu chưa hiểu đường dẫn sẽ bị xóa.

---

# 19. Những kiến thức cần nhớ

Không cần thuộc toàn bộ script.

Cần nhớ concept:

```text
$1
→ argument

$(command)
→ lấy output command

if
→ điều kiện

-z
→ string rỗng

-n
→ string không rỗng

-d
→ directory

-f
→ file

mkdir
→ tạo directory

tar
→ archive/compress

>
→ overwrite

>>
→ append

$?
→ exit code command trước

0
→ success

getopts
→ parse CLI options

OPTARG
→ value của option

case
→ xử lý từng option

cron
→ schedule task
```

---

# 20. Cách học bài này

Không học thuộc command dài.

Hãy hiểu luồng:

```text
Input
  ↓
Validate
  ↓
Timestamp
  ↓
Create directory
  ↓
Compress
  ↓
Check result
  ↓
Write log
```

