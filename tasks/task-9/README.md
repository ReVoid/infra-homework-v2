# GitLab CI

Напишите базовый CI/CD для репозитория.

Для этого форкните его на gitlab, создайте `.gitlab-ci.yml` файл и в нем опишите pipeline.

Пайплайн должен:

- Запускаться на push и создание PR, не запускаться если закомичены изменения в .md файлах
- Состоять из пяти шагов, выполняющихся каждый в своем стейдже: install, lint, build, test, deploy
- Deploy джоба должна быть manual
- lint и build должны запускаться параллельно после окончания install
- Запускаться на node:24
- Тесты должны запуститься на 22 и 24 ноде (необязательно использовать `matrix`)
- Кэшировать `.yarn/cache` и `node_modules`
- `.yarn/cache` использовать только в `install`, а `node_modules` во всех остальных джобах
- Для `cache:key` необходимо использовать `prefix`

Адрес GitLab - https://infra2.gitlab.yandexcloud.net/

Зарегистрируйтесь и форкните репозиторий - https://infra2.gitlab.yandexcloud.net/infra/infra-homework-v2

Далее локально добавьте его как другой remote вашего решения домашек.

Для проверки создайте Merge Request в репозиторий и призывайте @kholstinin на ревью.
