# ベースイメージ
FROM node:20-alpine

# terser をグローバルインストール
RUN npm install -g terser

# エントリポイントを terser に設定
# 例: docker run --rm -v %cd%:/work minify myscript.js -o myscript.min.js
ENTRYPOINT ["terser"]
